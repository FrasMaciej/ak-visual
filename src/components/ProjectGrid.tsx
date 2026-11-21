import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/components/Media'

export async function ProjectGrid() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    draft: false,
    pagination: false,
    depth: 1,
    sort: '-createdAt',
    select: { cover: true, slug: true, title: true },
  })
  if (!docs.length) return null

  return (
    <section id="projects" aria-label="Wybrane projekty" className="folio-grid">
      {docs.map((project, i) => (
        <Link className="folio-card" key={project.id} href={`/projects/${project.slug}`}>
          {typeof project.cover === 'object' && project.cover && (
            <Media
              resource={project.cover}
              priority={i === 0}
              size={i === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
              className="folio-image"
              imgClassName="folio-cover"
            />
          )}
          <div className="folio-caption">
            <span className="folio-index">{String(i + 1).padStart(2, '0')} /</span>
            <h2>{project.title}</h2>
            <span className="folio-action">
              Zobacz projekt <b aria-hidden="true">↗</b>
            </span>
          </div>
        </Link>
      ))}
    </section>
  )
}
