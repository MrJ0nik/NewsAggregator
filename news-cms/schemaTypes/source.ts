export default {
  name: 'newsSource',
  title: 'Allowed Source',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Source Name',
      type: 'string',
      description: 'The exact name of the source (e.g. "BBC News")',
    },
    {
      name: 'sourceId',
      title: 'API Identifier',
      type: 'slug',
      description: 'Slug for API filtering (e.g. "bbc-news")',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
  ],
}