// ** Mock Adapter
import mock from 'src/@fake-db/mock'

mock.onGet('/apps/invoice/invoices').reply(200, {
  allData: [
    {
      id: 1,
      name: 'Invoice 1',
      total: 100,
      avatar: 'avatar.png',
      service: 'Service 1',
      dueDate: '2023-06-08',
      address: 'Address 1',
      company: 'Company 1',
      country: 'Country 1',
      contact: 'Contact 1',
      avatarColor: '#28C76F',
      issuedDate: '2023-06-08',
      companyEmail: 'company1@example.com',
      balance: 0,
      invoiceStatus: 'Paid'
    },
    {
      id: 2,
      name: 'Invoice 2',
      total: 200,
      avatar: 'avatar.png',
      service: 'Service 2',
      dueDate: '2023-06-08',
      address: 'Address 2',
      company: 'Company 2',
      country: 'Country 2',
      contact: 'Contact 2',
      avatarColor: '#EA5455',
      issuedDate: '2023-06-08',
      companyEmail: 'company2@example.com',
      balance: 0,
      invoiceStatus: 'Paid'
    }
  ]
})
