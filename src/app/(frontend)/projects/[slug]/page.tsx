import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/components/Media'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
const findProject = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    draft: false,
    overrideAccess: false,
    depth: 1,
    limit: 1,
  })
  return result.docs[0] ?? notFound()
})

export async function generateMetadata({ params }: Props) {
  const project = await findProject((await params).slug)
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const project = await findProject((await params).slug)
  return (
    <main className="folio story">
      <header className="folio-intro">
        <Link className="folio-index" href="/#projects">
          ← Wszystkie projekty
        </Link>
        <h1>{project.title}</h1>
      </header>
      <div className="story-sequence">
        {typeof project.cover === 'object' && project.cover && (
          <Media
            priority
            className="story-lead folio-image"
            resource={project.cover}
            size="100vw"
            imgClassName="w-full h-auto"
          />
        )}
        <section className="story-note">
          <h2 className="folio-index">O projekcie</h2>
          <p>{project.description}</p>
        </section>
        <div className="story-gallery">
          {project.gallery?.map(
            ({ id, photo }, i) =>
              typeof photo === 'object' &&
              photo && (
                <figure className="story-frame" key={id}>
                  <Media
                    resource={photo}
                    size="(min-width: 701px) 45vw, 100vw"
                    imgClassName="story-photo"
                  />
                  <figcaption className="folio-index">
                    {project.title} &nbsp; / &nbsp; {String(i + 1).padStart(2, '0')}
                  </figcaption>
                </figure>
              ),
          )}
        </div>
      </div>
      <Link className="story-back" href="/#projects">
        ← Wróć do portfolio
      </Link>
    </main>
  )
}
