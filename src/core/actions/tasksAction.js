import { createActions } from 'redux-actions'
import * as constants from '../constants/tasksAction'

export const { addTask, deleteTask } =
createActions(
  constants.ADD_TASK,
  constants.DELETE_TASK
  //constants.GET_POKES_SUCCESS,
)
