import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '@/context/AuthContext'
import { LoginForm } from './LoginForm'
import { mockFetch } from '@/test/mockFetch'

const USER = {
  id: 'u1',
  email: 'a@b.com',
  createdAt: '2026-04-23T00:00:00Z',
}

describe('LoginForm', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('envia credenciais válidas', async () => {
    const onSuccess = vi.fn()
    const { calls } = mockFetch({
      'POST /api/auth/login': {
        body: { user: USER, tokens: { accessToken: 't' } },
      },
    })
    render(
      <AuthProvider>
        <LoginForm onSuccess={onSuccess} />
      </AuthProvider>,
    )
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'a@b.com' },
    })
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'secret123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }))
    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
    const call = calls.find((c) => c.url === '/api/auth/login')
    expect(JSON.parse(call!.init.body as string)).toEqual({
      email: 'a@b.com',
      password: 'secret123',
    })
  })

  it('bloqueia submit com senha curta', async () => {
    const onSuccess = vi.fn()
    mockFetch({})
    render(
      <AuthProvider>
        <LoginForm onSuccess={onSuccess} />
      </AuthProvider>,
    )
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'a@b.com' },
    })
    // bypass HTML minlength via direct form dispatch
    const form = screen.getByRole('button', { name: /Entrar/i }).closest('form')!
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: '123' },
    })
    fireEvent.submit(form)
    expect(
      await screen.findByText(/Email ou senha inválidos/i),
    ).toBeInTheDocument()
    expect(onSuccess).not.toHaveBeenCalled()
  })
})
