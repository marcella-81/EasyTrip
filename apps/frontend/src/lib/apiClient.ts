const TOKEN_KEY = 'easytrip:token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(path, { ...init, headers })

  if (res.status === 401) {
    clearToken()
    window.dispatchEvent(new CustomEvent('auth:logout'))
    throw new ApiError('Sessão expirada', 401)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const msg =
      (body as { message?: string; erro?: string }).message ??
      (body as { message?: string; erro?: string }).erro ??
      `HTTP ${res.status}`
    throw new ApiError(msg, res.status)
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
