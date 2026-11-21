import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/components/Media'

function StudioIntroduction() {
  return (
    <section
      id="o-nas"
      tabIndex={-1}
      className="studio-introduction"
      aria-labelledby="studio-introduction-title"
    >
      <div>
        <p className="folio-index">O nas</p>
        <h2 id="studio-introduction-title">Poznaj AK Visual.</h2>
      </div>
      <p>
        Jesteśmy architektkami: Angelika Kotowska i Anna Matuszewska. Projektujemy wnętrza, do
        których chce się wracać. Działamy w Sieradzu i we Wrocławiu, a projekty realizujemy na
        terenie całej Polski.
      </p>
    </section>
  )
}

export async function ProjectGrid({ opening = false }: { opening?: boolean } = {}) {
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
  if (!docs.length)
    return opening ? (
      <>
        <header className="folio-intro">
          <p className="folio-index">AK Visual · Sieradz · Wrocław</p>
          <h1>Projekty wnętrz.</h1>
          <p className="opening-coverage">Projektujemy na terenie całej Polski</p>
          <a href="#kontakt">Porozmawiajmy o Twoim wnętrzu ↗</a>
        </header>
        <StudioIntroduction />
      </>
    ) : null
  const lead = docs[0]
  const cards = opening && docs.length > 1 ? docs.slice(1) : docs

  return (
    <>
      {opening && (
        <section className="opening-scene" aria-labelledby="opening-title">
          {typeof lead.cover === 'object' && lead.cover && (
            <Media
              resource={lead.cover}
              priority
              size="100vw"
              className="opening-photo"
              imgClassName="opening-photo-img"
            />
          )}
          <div className="opening-type">
            <p className="folio-index">
              AK Visual &nbsp; / &nbsp; Pracownia projektowa · Sieradz · Wrocław
            </p>
            <h1 id="opening-title">
              <span>Światło</span> <em>prowadzi.</em>
            </h1>
            <p className="opening-line">Wnętrza, do których chce się wracać.</p>
            <p className="opening-coverage">Projektujemy na terenie całej Polski</p>
          </div>
          <div className="opening-nav">
            <a href="#o-nas">
              Przewiń <span aria-hidden="true">↓</span>
            </a>
            <Link href={`/projects/${lead.slug}`} aria-label={`Zobacz projekt: ${lead.title}`}>
              Zobacz projekt <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      )}
      {opening && <StudioIntroduction />}
      <section
        id="projects"
        tabIndex={-1}
        aria-label="Wybrane projekty"
        className={opening ? 'project-index' : ''}
      >
        {opening && (
          <header className="project-index-head">
            <p className="folio-index">Portfolio</p>
            <h2>Wybrane wnętrza</h2>
          </header>
        )}
        <div className="folio-grid">
          {cards.map((project, i) => (
            <Link className="folio-card" key={project.id} href={`/projects/${project.slug}`}>
              {typeof project.cover === 'object' && project.cover && (
                <Media
                  resource={project.cover}
                  priority={!opening && i === 0}
                  size={!opening && i === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
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
        </div>
      </section>
    </>
  )
}
