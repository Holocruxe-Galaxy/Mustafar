// ** Mock Adapter
import mock from 'src/@fake-db/mock'

mock.onGet('/cards/statistics').reply(200, {
  statsVertical: [
    {
      title: 'Title 1',
      stats: '10',
      icon: '<AccountBalanceIcon />',
      color: 'red',
      trendNumber: '5',
      trend: 'positive'
    },
    {
      title: 'Title 2',
      stats: '20',
      icon: '<AccessAlarmIcon />',
      chipText: 'Chip Text',
      color: 'blue',
      trendNumber: '10',
      trend: 'negative'
    }
  ],
  statsCharacter: [
    {
      src: '/path/to/image.png',
      title: 'Title 3',
      stats: '30',
      chipText: 'Chip Text',
      trendNumber: '15',
      trend: 'positive'
    },
    {
      src: '/path/to/image.png',
      title: 'Title 4',
      stats: '40',
      chipText: 'Chip Text',
      trendNumber: '20',
      trend: 'negative'
    }
  ],
  statsHorizontal: [
    {
      title: 'Title 5',
      stats: '50',
      icon: '<AccountBalanceIcon />',
      color: 'green',
      trendNumber: '25',
      trend: 'positive'
    },
    {
      title: 'Title 6',
      stats: '60',
      icon: '<AccessAlarmIcon />',
      color: 'yellow',
      trendNumber: '30',
      trend: 'negative'
    }
  ]
})
