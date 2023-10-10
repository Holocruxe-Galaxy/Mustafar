// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  return (
    <Card style={{ width: '810px', height: '849px', boxShadow: '4px 4px 4px 0px #FFFFFF80', paddingLeft: '1em' }}>
      <CardHeader
        title='Línea de tiempo'
        sx={{ '& .MuiCardHeader-avatar': { mr: 2.5 }, mt: 15 }}
        avatar={<Icon icon='mdi:format-list-bulleted' />}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
      />
      <CardContent>
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='warning' />
              <TimelineConnector sx={{ height: 120 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                }}
                component='div'
              >
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.disabled' }}>Tarea agregada con éxito</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', fontStyle: 'italic' }}>
                  Hoy
                </Typography>
              </Box>
              <Typography sx={{ mb: 2, color: 'text.primary' }}>Ir al supermercado </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector sx={{ height: 120 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                component='div'
              >
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.disabled' }}>
                Busqueda de recuerdos del primer cumpleaños de Emma
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', fontStyle: 'italic' }}>
                  1 día atrás
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.primary' }}>Resultados encontrados:
              <br />
              10 fotos
              <br />
              3 notas
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector sx={{ height: 120 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                component='div'
              >
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.disabled' }}>
                Se cargaron 2 nuevas entradas en bitacora, sección diario
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', fontStyle: 'italic' }}>
                  1 día atrás
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.primary', fontSize: 14 }}>Hoy conocí un lugar hermoso al cual quiero volver en unas semanas.
              <br />
              Se llama Café aromas.
              <br />
              Entrada 2
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                component='div'
              >
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.disabled' }}>Creación de nuevas alertas dentro de calendario.</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', fontStyle: 'italic' }}>
                  1 día atrás
                </Typography>
              </Box>

              {/* <Typography sx={{ color: 'text.primary' }}>Woocommerce iOS App Completed</Typography> */}
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
