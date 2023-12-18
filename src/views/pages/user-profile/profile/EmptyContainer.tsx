// ** MUI Imports
import Card from '@mui/material/Card'

const EmptyContainer = () => {
  return (
    <Card
      style={{
        width: '502px',
        height: '476px',
        boxShadow: '4px 4px 4px 0px #FFFFFF80',
        paddingLeft: '1em',
        marginTop: 50
      }}
    >
      {/* <Image src="/images/logos/logocruxie" alt=""/> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'8em' }}>
        <img
          src='/images/logos/logocruxie.png'
          alt=''

        />
      </div>
    </Card>
  )
}

export default EmptyContainer
