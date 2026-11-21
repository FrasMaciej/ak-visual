import { sql, type MigrateUpArgs } from '@payloadcms/db-postgres'
import { copy } from '@vercel/blob'
import media from './portfolio-media.json'

// One-time curation of this studio's uploaded collection. Empty/new installations skip it.
export async function up({ db, payload, req }: MigrateUpArgs) {
  const existing = await payload.find({ collection: 'media', req, depth: 0, pagination: false })
  const byID = new Map(existing.docs.map((doc) => [doc.id, doc]))
  if (!media.every((row) => byID.get(row.id)?.filename === `${row.old}.jpg`)) return
  const groups = new Map<string, number>()
  for (const row of media) {
    const doc = byID.get(row.id)!
    const group = row.label.split(' — ')[0]
    if (!groups.has(group)) {
      const folder = await payload.create({
        collection: 'payload-folders',
        req,
        data: { name: group, folderType: ['media'] },
      })
      groups.set(group, folder.id)
    }
    const prefix = [doc.prefix, doc._objectKey].filter(Boolean).join('/')
    const path = (file: string) => [prefix, file].filter(Boolean).join('/')
    // These two duplicate uploads lack their original blob. Use the intact, same-resolution uploads.
    const source = byID.get(row.id === 56 ? 4 : row.id === 57 ? 3 : row.id)!
    const sourceStem = source.filename!.slice(0, -4)
    const sourcePath = (suffix: string) => [source.prefix,source._objectKey,sourceStem+suffix].filter(Boolean).join('/')
    await Promise.all(
      [...new Set(['.jpg', ...Object.values(row.sizes)])].map((suffix) =>
        copy(sourcePath(suffix), path(row.new + suffix), {
          access: 'public',
          allowOverwrite: true,
          addRandomSuffix: false,
        }),
      ),
    )
    const url = (suffix: string) => `/api/media/file/${row.new}${suffix}`
    const updates = [
      sql`filename=${row.new + '.jpg'}`,
      sql`url=${url('.jpg')}`,
      sql`alt=${doc.alt || row.label}`,
      sql`folder_id=${groups.get(group)}`,
      sql`thumbnail_u_r_l=${url(row.sizes.thumbnail)}`,
    ]
    for (const [size, suffix] of Object.entries(row.sizes)) {
      updates.push(
        sql`${sql.identifier(`sizes_${size}_filename`)}=${row.new + suffix}`,
        sql`${sql.identifier(`sizes_${size}_url`)}=${url(suffix)}`,
      )
    }
    await db.execute(sql`update media set ${sql.join(updates, sql`, `)} where id=${row.id}`)
  }
  const kitchen = await payload.find({
    collection: 'projects',
    req,
    depth: 0,
    where: { slug: { equals: 'kuchnia1' } },
  })
  if (kitchen.docs[0])
    await payload.update({
      collection: 'projects',
      id: kitchen.docs[0].id,
      req,
      data: {
        title: 'Wokół wyspy',
        description:
          'Ciemna wyspa wyznacza środek kuchni. Od strony okna widać jej długi blat; od strony salonu — rząd krzeseł i światło biegnące wzdłuż zabudowy.',
        cover: 57,
        gallery: [{ photo: 58 }, { photo: 56 }],
        _status: 'published',
      },
    })

  for (const [title, slug, description, cover, photos] of [
    [
      'Gabinet w kontraście',
      'gabinet-w-kontrascie',
      'Czerń powraca tu w kilku skalach: w fotelu przy biurku, w drobnym wzorze tkaniny i w pionach zabudowy. Jasne ściany i zaokrąglony blat zostawiają tym akcentom miejsce.',
      31,
      [26, 27, 28],
    ],
    [
      'Róż pod skosem',
      'roz-pod-skosem',
      'Światło z okna dachowego pada prosto na wannę. Przy podłodze pojawia się przygaszony róż; wyżej jego miejsce zajmują jasne płaszczyzny i miękki obrys lustra.',
      64,
      [62, 59, 60, 65],
    ],
    [
      'Miękka geometria',
      'miekka-geometria',
      'Niski stolik, obła sofa, krzesło o zaokrąglonym oparciu. Ten sam łuk prowadzi od części wypoczynkowej do stołu. Z bliska uwagę przejmują splot tkaniny i rysunek konsoli pod lampą.',
      9,
      [6, 5, 12, 11],
    ],
    [
      'Światło na dwie kondygnacje',
      'swiatlo-na-dwie-kondygnacje',
      'Wysokie przeszklenia otwierają salon na zieleń, a nisko osadzone sofy skupiają przestrzeń wokół stolików. Spojrzenie wędruje od stołu do ciemnej bryły kominka, a potem ku lekkim liniom lamp.',
      49,
      [47, 45, 52, 44],
    ],
  ] as const)
    await payload.create({
      collection: 'projects',
      req,
      data: {
        title,
        slug,
        generateSlug: false,
        description,
        cover,
        gallery: photos.map((photo) => ({ photo })),
        _status: 'published',
      },
    })
}

export async function down() {
  throw new Error('Editorial content: restore a database backup to roll back this migration.')
}
