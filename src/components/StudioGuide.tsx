import Link from 'next/link'

type Props = {
  label: string
  title: string
  intro: string
  items: { title: string; text: string }[]
}

export function StudioGuide({ label, title, intro, items }: Props) {
  return (
    <main className="folio studio-guide">
      <header className="folio-intro">
        <p className="folio-index">AK Visual / {label}</p>
        <h1>{title}</h1>
        <p className="studio-guide-intro">{intro}</p>
      </header>
      <ol className="studio-guide-list">
        {items.map(({ title, text }, i) => (
          <li key={title}>
            <span className="folio-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link className="studio-guide-link" href="/kontakt">
        Porozmawiajmy o projekcie ↗
      </Link>
    </main>
  )
}
