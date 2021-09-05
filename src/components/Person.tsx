import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Check, Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { Person } from '../store/models/person'
import { personSchema } from '../api/validations'

interface PersonProps {
  person: Person,
  showDialog: boolean,
  setShowDialog: (open: boolean) => void,
  setSelectedPerson: (person: Person) => void,
  addPerson: (person: Person) => void,
}

const checkOnGoodInput = (field: string) => ({
  endAdornment:
    field ?
    <InputAdornment position="start">
      <Check />
    </InputAdornment>
    : '',
})

const PersonForm = ({
  person,
  showDialog,
  setShowDialog,
  setSelectedPerson,
  addPerson,
}: PersonProps) => {

  const [submitEnabled, setSubmitEnabled] = useState(false)

  const close = () => setShowDialog(false)
  const save = () => addPerson(person)

  const {
    firstName,
    lastName,
    dob,
    phone,
    address,
    notes,
  } = person

  const [promptText, setPrompt] = useState('Complete the fields below.')

  const updateField = (field: string, value: string) => setSelectedPerson({
    ...person,
    [field]: value,
  })

  useEffect(() => {
    const validate = personSchema.validate(person)

    if (!validate.error) {
      setPrompt('Entries look good!')
      setSubmitEnabled(true)
    } else {
      setPrompt('Complete the fields below.')
      setSubmitEnabled(false)
    }
  }, [person])

  return (
    <div style={{ height: "100%"}}>
      <Dialog style={{ display: "flex" }} maxWidth="lg" open={showDialog} onClose={() => close()}>
        <DialogTitle style={{ display: 'flex', justifyContent: "space-between"}}>
          {promptText}
          <IconButton onClick={() => close()}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ flexDirection: "row" }}>
          <DialogContentText>
            * Optional
          </DialogContentText>
          <TextField
            onChange={e => updateField('firstName', e.target.value)}
            value={firstName}
            margin="dense"
            id="firstName"
            label="First Name:"
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(firstName)}
          />
          <TextField
            onChange={e => updateField('lastName', e.target.value)}
            value={lastName}
            margin="dense"
            id="lastName"
            label="Last Name:"
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(lastName)}
          />
          <TextField
            onChange={e => updateField('dob', e.target.value)}
            value={dob}
            margin="dense"
            id="dob"
            label="Date of Birth:"
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(dob)}
          />
          <TextField
            onChange={e => updateField('phone', e.target.value)}
            value={phone}
            margin="dense"
            id="phone"
            label="Phone Number:"
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(phone)}
          />
          <TextField
            onChange={e => updateField('address', e.target.value)}
            value={address}
            margin="dense"
            id="address"
            label="Address:"
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(address)}
          />
          <TextField
            onChange={e => updateField('notes', e.target.value)}
            value={notes}
            margin="dense"
            id="notes"
            label="*Notes:" 
            type="string"
            fullWidth
            variant="outlined"
            InputProps={checkOnGoodInput(notes)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => close()}>Cancel</Button>
          <Button disabled={!submitEnabled} variant="contained" onClick={() => (save(), close())}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PersonForm