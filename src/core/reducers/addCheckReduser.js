/* eslint-disable import/no-anonymous-default-export */
import * as actions from '../actions/addCheckAction'

export const addCheck = {
  check: [],
}

const HANDLERS = {
  [actions.addCheck]: (state, data) => {
    const filter = state.check.filter(item => item === data)
    const index = state.check.findIndex(item => item === data)
    if(filter.length >= 1){
        return {
            ...state,
            check: [
              ...state.check.splice(0, index),
              ...state.check.splice(index + 1)
            ],
        }  
    }else{
        return {
            ...state,
            check: [
              ...state.check, data
            ],
        }  
    }
  },
 
}
export default (state = addCheck, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}