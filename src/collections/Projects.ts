import { slugField, type CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', '_status', 'updatedAt'] },
  access: {
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: { mimeType: { like: 'image/' } },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: { description: 'Drag the photos into the order visitors should see them.' },
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: { mimeType: { like: 'image/' } },
        },
      ],
    },
  ],
}
