// ** Mock Adapter
import mock from 'src/@fake-db/mock'

mock.onGet('/apps/invoice/clients').reply(200, {
  data: [
    {
      name: 'Client 1',
      address: 'Address 1',
      company: 'Company 1',
      country: 'Country 1',
      contact: 'Contact 1',
      companyEmail: 'company1@example.com'
    },
    {
      name: 'Client 2',
      address: 'Address 2',
      company: 'Company 2',
      country: 'Country 2',
      contact: 'Contact 2',
      companyEmail: 'company2@example.com'
    }
  ]
})
