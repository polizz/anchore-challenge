import { createTypedHooks } from 'easy-peasy'
import { StoreModel } from '../models/store'

const {
    useStoreActions,
    useStoreDispatch,
    useStoreState
} = createTypedHooks<StoreModel>()

export { 
    useStoreActions,
    useStoreDispatch,
    useStoreState
}