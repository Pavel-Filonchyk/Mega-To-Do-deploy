import { createActions } from 'redux-actions'
import * as constants from '../constants/tasksAction'

export const { 
  addTask, 
  deleteTask, 
  saveTask, 
  newTask, 
  grabFirstTask, 
  grabSecondTask, 
  grabChangeTasks 
} =
createActions(
  constants.ADD_TASK,
  constants.DELETE_TASK,
  constants.SAVE_TASK,
  constants.NEW_TASK,
  constants.GRAB_FIRST_TASK,
  constants.GRAB_SECOND_TASK,
  constants.GRAB_CHANGE_TASKS
)
