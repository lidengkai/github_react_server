import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import store from './store'
import Home from '@/view/Home'
import Test from '@/view/Test'
// exception
import Exception404 from '@/view/Exception/404'

const App: FC<{}> = () => {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/test" exact component={Test} />
          {/* exception */}
          <Route path="/*" component={Exception404} />
        </Switch>
      </Provider>
    </>
  )
}

export default App
