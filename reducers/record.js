
const SET_RECORD_GROUPS = "SET_RECORD_GROUPS"
const SELECT_DATE ="SELECT_DATE"
const SELECT_PERIOD ="SELECT_PERIOD"

const handlers = {
  [SET_RECORD_GROUPS](state, recordGroups){
    return Object.assign({}, state, {recordGroups})
  }
}

export const actions = {
  setRecordGroups(groups){
    return {
      type:SET_RECORD_GROUPS,
      value:groups
    }
  }
}


export default function reducer(state={recordGroups:[]}, action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}
