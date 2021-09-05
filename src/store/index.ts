import { createStore } from 'easy-peasy'
import storeModel, { StoreModel } from './models/store'

const store = createStore<StoreModel>(storeModel)

export default store