import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import getTasks from './tasksReducer'
import addCheck from './addCheckReduser'


export const history = createBrowserHistory()

const staticReducers = {
  router: connectRouter(history),
    getTasks,
    addCheck,
}

export default staticReducers
