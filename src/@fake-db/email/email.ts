// ** Mock Adapter
import mock from 'src/@fake-db/mock'

mock.onGet('/apps/email/allEmails').reply(200, {
  emails: [
    {
      id: '1',
      message: 'Hello World',
      subject: 'Hello World',
      isRead: false,
      to: [{ name: 'John Doe', email: 'johndoe@example.com' }],
      cc: [],
      isStarred: false,
      bcc: [],
      from: { name: 'Jane Doe', email: 'janedoe@example.com' },
      time: new Date(),
      replies: [],
      folder: 'inbox',
      labels: ['company'],
      attachments: []
    },
    {
      id: '2',
      message: 'Testing',
      subject: 'Testing',
      isRead: false,
      to: [{ name: 'John Doe', email: 'johndoe@example.com' }],
      cc: [],
      isStarred: false,
      bcc: [],
      from: { name: 'Jane Doe', email: 'janedoe@example.com' },
      time: new Date(),
      replies: [],
      folder: 'inbox',
      labels: ['personal'],
      attachments: []
    }
  ]
})
