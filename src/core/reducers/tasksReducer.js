/* eslint-disable import/no-anonymous-default-export */
import uuid from 'react-uuid'
import { addElem, deleteElem, changeElem } from '../../common/utils'
import { data } from '../../common/constants/data'

import * as actions from '../actions/tasksAction'

export const getTasks = {
  tasks: data,
  taskId: '',
  grabFirstTask: null,
  grabSecondTask: null,
  grabChangeTasks: false
}

const HANDLERS = {
  [actions.addTask]: (state, data) => {
    return {
      ...state,
      tasks: [
        { id: uuid(), task: data, arrs: null }, 
        ...state.tasks
      ],
    }  
  },
  [actions.newTask]: (state, data) => {
    return {
      ...state,
      tasks: addElem(state.tasks, data.id, data.todo)
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
  [actions.grabFirstTask]: (state, data) => {
    return {
      ...state,
      grabFirstTask: data,
      grabSecondTask: null,
      grabChangeTasks: false
    }  
  },
  [actions.grabSecondTask]: (state, data) => {
    return {
      ...state,
      grabSecondTask: data.id,
      tasks: addElem(state.tasks, data.id, state.grabFirstTask.todo),
    }
    
  },
  [actions.grabChangeTasks]: (state, data) => {
    if(data){
      return {
        ...state,
        tasks: deleteElem(state.tasks, state.grabFirstTask.id) 
      }  
    }
  },
}

export default (state = getTasks, { type, payload }) => {
  const handler = HANDLERS[type]
  return handler ? handler(state, payload) : state
}