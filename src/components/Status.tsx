import type { Status as StatusKind } from '../lib/content'

const copy: Record<StatusKind, string> = { live: 'Live', soon: 'Soon' }

export function Status({ kind }: { kind: StatusKind }) {
  return (
    <span className={`status status--${kind}`}>
      <span className="status__dot" aria-hidden="true" />
      {copy[kind]}
    </span>
  )
}
