import { Action, action, Thunk, thunk } from 'easy-peasy'

// TODO: should be an service binding injection
const API_SERVER = 'http://localhost:3001/'

export interface Person {
	id: string,
	firstName: string,
	lastName: string,
	dob: string,
	phone: string,
	address: string,
	notes: string,
}

export interface PersonModel {
	all: Person[],
	setAll: Action<PersonModel, Person[]>,
	initialize: Thunk<PersonModel>,
	addPerson: Thunk<PersonModel, Person>,
	delPerson: Thunk<PersonModel, string>,
}

const personModel: PersonModel = {
	initialize: thunk(async (actions, payload) => {
		try {
			const response = await fetch(`${API_SERVER}persons`)
			const allPersons = await response.json()
	
			actions.setAll(allPersons)
		} catch (err) {
			actions.setAll([])
			console.log('Error retrieving all persons')
		}
	}),
	all: [],
	setAll: action((state, payload) => {
		state.all = payload
	}),
	addPerson: thunk(async (actions, payload) => {
		try {
			await fetch(`${API_SERVER}person`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
				}
			})
	
			actions.initialize()
		} catch (err) {
			console.log('Error saving person')
		}
	}),
	delPerson: thunk(async (actions, id) => {
		try {
			await fetch(`${API_SERVER}person/${id}`, {
				method: 'DELETE',
			})
	
			actions.initialize()
		} catch (err) {
			console.log('Error deleting person')
		}
	})
}

export default personModel