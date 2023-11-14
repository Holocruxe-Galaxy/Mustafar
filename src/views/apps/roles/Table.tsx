// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Redux
import { updateStatus } from 'src/store/apps/admin'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersData, UsersType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import { computeSlots } from '@mui/x-data-grid/internals'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'red'/* 'error.main' */ },
  author: { icon: 'mdi:cog-outline', color: 'yellow' /* 'warning.main' */ },
  editor: { icon: 'mdi:pencil-outline', color: 'green' /* 'info.main' */ },
  maintainer: { icon: 'mdi:chart-donut', color: 'pink' /* 'success.main' */ },
  user: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj: UserStatusType = {
  COMPLETE: 'success',
  PENDING: 'warning',
  INACTIVE: 'secondary'
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }: CellType) => {
      const { fullName } = row

      return (
        <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component='div' sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              variant='subtitle2'
              href='/apps/user/view/overview/'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {fullName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box component='div' sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, /* color: userRoleObj[row.role].color */ }}}>
         {/*  <Icon icon={userRoleObj[row.role].icon} fontSize={20} /> */}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {!row.role ? 'User' : row.role}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Plan',
    field: 'currentPlan',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
          {!row.plan? 'Free' : row.plan}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <IconButton component={Link} href='/apps/user/view/overview/'>
        <Icon icon='mdi:eye-outline' />
      </IconButton>
    )
  }
]

const UserList = () => {
  // ** State
  const [actionMessage, setActionMessage] = useState<string>("");

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [plan, setPlan] = useState<string>('')
  const [redactar, setRedactar] = useState<string>('')
  const [selectedUsers, setSelectedUsers] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const store = useSelector((state: RootState) => state.admin)
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  
  //useEffect(() => {
  //   dispatch(

  //     // fetchData({
  //     //   role: '',
  //     //   q: value,
  //     //   status: '',
  //     //   currentPlan: plan
  //     // })
  //   )
  // }, [dispatch, plan, value])
  
  const handleSelectionChange = (id: string) => {
    setSelectedUsers(id)
  };

  const handleActionButtonClick = (val: string) => {
    if (selectedUsers.length > 0) {
      if (val === 'reactivar') dispatch(updateStatus({ type: 'reactivar', users: selectedUsers }))
      if (val === 'suspender') {
        setActionMessage("Ud suspenderá esta cuenta por")
      }
      if (val === 'banear') {
        setActionMessage("¿Está seguro que desea bannear al usuario?")
    }
  }
}

  const handleActionConfirm = (val: string) => {
    console.log("Entramos al handleActionConfirm")
    if (val === 'suspender') {
      dispatch(updateStatus({ type: 'suspender', users: selectedUsers}))
      setActionMessage("");
    } else {
      dispatch(updateStatus({ type: 'banear', users: selectedUsers }))
      setActionMessage("");
    }
    }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader redactar={redactar} plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} handleActionButtonClick={handleActionButtonClick} actionMessage={actionMessage} selectedUsers={selectedUsers} setActionMessage={setActionMessage} handleActionConfirm={handleActionConfirm} />

          <DataGrid
            autoHeight
            rows={store.data}
            getRowId={(row) => row.id}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(id) => handleSelectionChange(id)}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}


export default UserList
