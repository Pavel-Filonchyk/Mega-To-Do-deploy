import { createActions } from 'redux-actions'
import * as constants from '../constants/addCheckAction'

export const { addCheck } =
createActions(
  constants.ADD_CHECK,
)