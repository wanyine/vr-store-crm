import _ from 'lodash'

const SET_USERS="SET_USERS"
const ADD_USER = "ADD_USER"
const EDIT_USER ="EDIT_USER" 
const DELETE_USER ="DELETE_USER"
const SEARCH_USER="SEARCH_USER"

let _origin = []

const _search = ({searchText}) => {
  const trimed = searchText.trim()
  let users = _origin
  if(trimed !== ''){
    users = _origin.filter(user => user.name.indexOf(trimed) > -1)
  }
  return ({searchText, users: users.sort((left, right) => left.name > right.name)})
} 

const handlers = {
  [SET_USERS](state, users){
    _origin = users
    return _search(state)
  },
  [ADD_USER](state, user){
    _origin =  _.uniqBy([user].concat(_origin), '_id')
    return _search(state)
  },
  [EDIT_USER](state, user){
    _origin =  _.uniqBy([user].concat(_origin), '_id')
    return _search(state)
  },
  [DELETE_USER](state, id){
    _origin = _origin.filter(user => user['_id'] != id)
    return _search(state)
  },
  [SEARCH_USER](state, searchText){
    return _search(Object.assign({}, state, {searchText}))
  }
}

export const actions = {
  setUsers(value){
    return {
      type:SET_USERS,
      value
    }
  },
  addUser(value){
    return {
      type:ADD_USER,
      value
    }
  },
  editUser(value){
    return {
      type:EDIT_USER,
      value
    }
  },
  deleteUser(value){
    return {
      type:DELETE_USER,
      value
    }
  },
  searchUser(value){
    return {
      type:SEARCH_USER,
      value
    }
  
  }
}

export default function reducer(state={users:[], searchText:''}, action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}
