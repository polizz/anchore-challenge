/* eslint-disable no-unused-vars */
const couchbase = require('couchbase')
const isEmpty = require('lodash/isEmpty')
const omit = require('lodash/omit')

const { COUCHBASE_URL } = process.env

const connect = async () => {
  try {
    const _cluster = await couchbase.connect(
      COUCHBASE_URL,
      {
        username: process.env.COUCH_USER,
        password: process.env.COUCH_PASS,
      })
  
      return [
        _cluster
          .bucket('Persons')
          .defaultCollection(),
        _cluster]
  } catch (err) {
    return `Database Connection Error: ${err}`
  }
}

let coll
let cluster

connect().then(([_coll, _cluster]) => {
  console.log('Connecting to Couchbase...')

  coll = _coll
  cluster = _cluster
})

const upsert = async (data) => {
  const id = isEmpty(data.id) ?
    Date.now().toString() : data.id

  await coll.upsert(id, omit(data, 'id'))

  return ({
    id,
    ...data
  })
}

const mungeGetAll = rows =>
  rows.map(({ Persons, id }) => ({
    id,
    ...Persons,
  }))

const getAll = async () => {
  const { rows } = await cluster.query('SELECT *, meta(Persons).id as id FROM Persons;')

  return mungeGetAll(rows)
}

const remove = async (id) => {
  await coll.remove(id)
}


module.exports = {
  upsert,
  getAll,
  remove,
  cluster,
}