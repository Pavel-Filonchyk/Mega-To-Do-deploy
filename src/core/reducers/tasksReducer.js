/* eslint-disable import/no-anonymous-default-export */

import uuid from 'react-uuid'
import * as actions from '../actions/tasksAction'

export const getTasks = {

  tasks: [{id: 1, task: 'Первая задача'}, {id: 2, task: 'Вторая задача'}, {id: 3, task: 'Третья задача'}],
  //pokes: null,
}

const HANDLERS = {
  // [getPokesDataSuccess]: (state, data) => {
  //   return {
  //       ...state,
  //       pokesData: data,
  //   }  
  // },
  [actions.addTask]: (state, data) => {
    return {
        ...state,
        tasks: [
          ...state.tasks, {id: uuid(), task: data}
        ],
    }  
  },
  [actions.deleteTask]: (state, data) => {
    const id = data
    const index = state.tasks.findIndex(item => item.id === id)
    return {
        ...state,
        tasks: [
          ...state.tasks.splice(0, index),
          ...state.tasks.splice(index + 1)
        ],
    }  
  },
}

export default (state = getTasks, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}