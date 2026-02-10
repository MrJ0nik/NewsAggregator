export default {
  name: 'topic',
  title: 'Topic Definition',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Topic Title',
      type: 'string',
      description: 'e.g. "Tech", "Politics"',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of words to match in article titles',
    },
  ],
}