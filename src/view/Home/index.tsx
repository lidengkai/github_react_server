/**
 * @module Home
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'

const Home: FC<View.Props> = (props) => {
  const { homeText } = props

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.text}>{homeText}</div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
    homeText: data.homeText
  }
}

export default connect(mapStateToProps)(Home)
