export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'email',
        type: 'string',
      },
      {
        name: 'comment',
        type: 'text',
      },
      {
        name: 'post',
        type: 'reference',
        to: [
          {type: 'post'}
        ]
      },
      {
        title:"Approved",
        name:"approved",
        type: "boolean",
        desc:"You won't comment without approval It project us from the spam and harmful messages",
      }
    ],
  }