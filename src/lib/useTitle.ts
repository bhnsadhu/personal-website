import { useEffect } from 'react'
import { site } from './content'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — The Menu`
  }, [title])
}
