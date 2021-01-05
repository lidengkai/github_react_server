import store from '@/store'
import history from '@/history'
import { NAME } from './constant'
import { init, commit } from './store'
import * as requests from '../api/requests'
import { StateInterface } from '../interface'
import formatter from '@/utils/formatter'

const getState: GetState<typeof NAME, StateInterface> = (key = NAME) => {
  const state: any = store.getState()
  return state[key] || {}
}

export async function initPage() {
  await store.dispatch(init())
}
