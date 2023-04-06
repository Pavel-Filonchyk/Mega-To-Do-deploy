/* eslint-disable import/no-anonymous-default-export */
import uuid from 'react-uuid'
import { addElem, deleteElem, changeElem } from '../../utils'
import * as actions from '../actions/tasksAction'

export const getTasks = {

  tasks: [{id: 1, task: 'Первая задача', arrs: null}, {id: 2, task: 'Вторая задача', arrs: null}, {id: 3, task: 'Третья задача', arrs: null}],
  taskId: ''
}

const HANDLERS = {
  [actions.addTask]: (state, data) => {
    return {
        ...state,
        tasks: [
          ...state.tasks, {id: uuid(), task: data, arrs: null}
        ],
    }  
  },
  [actions.newTask]: (state, data) => {
    return {
        ...state,
        tasks: addElem(state.tasks, data)
    }  
  },
  [actions.deleteTask]: (state, data) => {
    return {
        ...state,
        tasks: deleteElem(state.tasks, data) 
    }  
  },
  [actions.saveTask]: (state, data) => {
    const id = data.id
    const value = data.value
    return {
        ...state,
        tasks: changeElem(state.tasks, id, value), 
        taskId: id
    }  
  },
}

export default (state = getTasks, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}