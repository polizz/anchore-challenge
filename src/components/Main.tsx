import { useStoreActions } from '../store/hooks'
import { useEffect, useState } from 'react'
import { Paper, Container, IconButton } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"
import { ControlPoint } from '@mui/icons-material'
import Persons from './Persons'
import PersonForm from './Person'
import { Person } from '../store/models/person'

const useStyles = makeStyles({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
}})

const newPerson: Person = {
	id: "",
	firstName: "",
	lastName: "",
	dob: "",
	phone: "",
	address: "",
	notes: "",
}

const Main = () => {
	const { initialize, addPerson, delPerson } = useStoreActions(action => action.persons)
	const [showDialog, setShowDialog] = useState(false)
	const [selectedPerson, setSelectedPerson] = useState(newPerson)
	const paperStyle = useStyles()

	const editPerson = (person: Person) => {
		setSelectedPerson(person)
		setShowDialog(true)
	}

	useEffect(() => {
		initialize()
	}, [initialize])

	return (
		<>
			<Container maxWidth="lg">
				<Paper className={paperStyle.paper}>
					<span>Add a favorite person.</span>
					<Persons
						editPerson={editPerson}
						delPerson={delPerson}
					/>
				</Paper>
			</Container>
			<IconButton onClick={() => editPerson(newPerson)}>
				<ControlPoint />
			</IconButton>	
			<PersonForm
				person={selectedPerson}
				showDialog={showDialog}
				setShowDialog={setShowDialog}
				setSelectedPerson={setSelectedPerson}
				addPerson={addPerson}
			/>
		</>
		)
}
	

export default Main