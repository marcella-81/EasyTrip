import { Link2, Share2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ShareProfileButtonProps {
  userId: string
}

export function ShareProfileButton({ userId }: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = `${window.location.origin}/profile/${userId}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Meu perfil no EasyTrip',
          text: 'Veja meu perfil de viagens',
          url,
        })
        return
      }
    } catch {
      // fallthrough para clipboard
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copiado!', { description: url })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar o link')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={share}
          className="gap-2"
          style={{
            background: 'rgba(79,142,247,0.1)',
            borderColor: 'rgba(79,142,247,0.3)',
            color: '#7dd3fc',
          }}
        >
          {copied ? <Link2 size={14} /> : <Share2 size={14} />}
          {copied ? 'Copiado' : 'Compartilhar perfil'}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copia /profile/{userId.slice(0, 8)}…</TooltipContent>
    </Tooltip>
  )
}
