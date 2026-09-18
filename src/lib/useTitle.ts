import { useEffect } from 'react'
import { site } from '../data'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — Your Hand`
  }, [title])
}
