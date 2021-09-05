const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { validatePostPerson } = require('./api/validations')

require('dotenv').config()

const { upsert, getAll, remove, cluster } = require('./api/db')

const { API_PORT } = process.env
const app = express()

app.use(cors())
app.use(bodyParser.json()) // TODO: why is this deprecated?

const handleUpsert = async ({ body }, res) => {
  try {
    await validatePostPerson(body)

    res.status(200).send(await upsert(body))
  } catch (err) {
    res.status(500).send(`Error upserting: ${err}`)
  }
}

app.post('/person', (req, res) =>
  handleUpsert(req, res))

app.put('/person', (req, res) =>
  handleUpsert(req, res))

app.get('/persons', async (req, res) => {
  try {
    res.status(200).send(await getAll())
  } catch (err) {
    res.status(500).send(`Error getting all persons: ${err}`)
  }
})

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id
  try {
    res.status(200).send(await remove(id))
  } catch (err) {
    res.status(500).send(`Error deleting persons: ${id}. Error: ${err}`)
  }
})

app.listen(API_PORT, () => console.log(`API listening on port: ${API_PORT}...`))