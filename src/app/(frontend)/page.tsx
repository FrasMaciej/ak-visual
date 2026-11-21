import { ProjectGrid } from '@/components/ProjectGrid'

// Read the current portfolio on each visit, including the first project published after deploy.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'AK Visual — Projekty wnętrz',
  description: 'Portfolio wnętrz AK Visual. Wybrane projekty i ich detale.',
}

export default function Home() {
  return (
    <main className="folio">
      <header className="folio-intro">
        <p className="folio-index">AK Visual &nbsp; / &nbsp; Portfolio</p>
        <h1>
          Projekty <i>wnętrz.</i>
        </h1>
      </header>
      <ProjectGrid />
    </main>
  )
}
