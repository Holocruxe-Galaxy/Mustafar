// ** MUI Imports
import Card from '@mui/material/Card'

const EmptyContainer = () => {
  return (
    <Card
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        boxShadow: '4px 4px 4px 0px #FFFFFF80',
        paddingLeft: '1em'
      }}
    >
      {/* <Image src="/images/logos/logocruxie" alt=""/> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src='/images/logos/logocruxie.png'
          alt=''
        />
      </div>
    </Card>
  )
}

export default EmptyContainer
