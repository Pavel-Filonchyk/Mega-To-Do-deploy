import { APP_CONFIG } from '../constants/config'

const {
    REACT_APP_SERVER_URL
} = APP_CONFIG


export const POST_POKES = `${REACT_APP_SERVER_URL}/pokes`

export const POST_LOGIN = `${REACT_APP_SERVER_URL}/login`
export const POST_REGISTRATION = `${REACT_APP_SERVER_URL}/registration`


export const LOGIN = `${REACT_APP_SERVER_URL}`