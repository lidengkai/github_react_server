import { AppStateInterface } from './interface'

export const APP_STORE = 'APP_STORE'
const INIT = 'APP_STORE_INIT'
const COMMIT = 'APP_STORE_COMMIT'

const initialState: AppStateInterface = {
}

export default function (state = initialState, action: any) {
  const { type, data } = action
  switch (type) {
    case INIT:
      return { ...initialState }
    case COMMIT:
      return { ...state, ...data }
    default:
      return { ...state }
  }
}

export const appInit = () => {
  return { type: INIT }
}

export const appCommit = (data: Partial<AppStateInterface> = {}) => {
  return { type: COMMIT, data }
}
