import personModel, { PersonModel } from "./person";

export interface StoreModel {
    persons: PersonModel,
}

const storeModel: StoreModel = {
    persons: personModel
}

export default storeModel