import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import './index.less'
import store from '@/store'

const initStore = store.getState()

export default (path: string, state = {}) => {
  store.replaceReducer(() => {
    return {
      ...initStore,
      ...state
    }
  })
  console.log(store.getState())
  const context = {}
  return renderToString(
    <StaticRouter location={path} context={context}>
      <App />
    </StaticRouter>
  )
}
