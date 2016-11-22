import { createStore, combineReducers} from 'redux';

import recordReducer from '../reducers/record'
import userReducer from '../reducers/user'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({ 
  user   : userReducer,
  form   : formReducer,
  record : recordReducer
})

const store = createStore(rootReducer)

export default store;
