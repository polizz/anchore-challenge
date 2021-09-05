import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import { Create, Delete } from '@mui/icons-material'
import { useStoreState } from '../store/hooks'
import { Person } from '../store/models/person'

type PersonAction = (person: Person) => void
interface PersonsProps {
  editPerson: PersonAction,
  delPerson: (id: string) => void,
}

const makeColumns = (editPerson: PersonAction, delPerson: (id: string) => void): GridColDef[] => ([
  {
    field: 'firstName',
    headerName: 'First Name',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    minWidth: 150,
    editable: false,
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    type: 'string',
    minWidth: 110,
    editable: false,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    type: 'string',
    minWidth: 110,
    editable: false,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    minWidth: 110,
    editable: false,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    type: 'string',
    minWidth: 110,
    editable: false,
  },
  {
    field: '',
    headerName: '',
    minWidth: 150,
    editable: false,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <IconButton onClick={() => editPerson(params.row as Person)}>
          <Create />
        </IconButton>
        <IconButton onClick={() => delPerson(params.id.toString())}>
          <Delete />
        </IconButton>
      </>
    ),
  },
])

const Persons = ({ editPerson, delPerson }: PersonsProps) => {
  const allPersons = useStoreState(({ persons }) => persons.all)

  const columns = makeColumns(editPerson, delPerson)
	
	return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={allPersons}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection={false}
      />
    </div>
		)
}
	
export default Persons