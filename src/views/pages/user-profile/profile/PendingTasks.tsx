// ** MUI Imports
import Card from '@mui/material/Card'

const PendingTasks = () => {
  return (
    <Card style={{  
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '30rem', 
      boxShadow: '4px 4px 4px 0px #FFFFFF80', 
      paddingLeft: '1em',
      marginLeft: 10, 
      }}>
     <img src="/images/cards/noTasks.png" alt="" style={{ height: '11rem' }}/>
   </Card>
  )
}

export default PendingTasks
