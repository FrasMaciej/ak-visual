import { ProjectGrid } from '@/components/ProjectGrid'
import './experience.css'

// Read the current portfolio on each visit, including the first project published after deploy.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'AK Visual — Projekty wnętrz',
  description: 'Portfolio wnętrz AK Visual. Wybrane projekty i ich detale.',
}

export default function Home() {
  return (
    <main className="folio home-experience">
      <ProjectGrid opening />
    </main>
  )
}
