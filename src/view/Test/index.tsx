/**
 * @module Test
 */
import { connect } from 'react-redux'
import { NAME } from './flow/constant'
import * as action from './flow/action'
import styles from './style.less'
import { StateInterface, View } from './interface'

const Test: FC<View.Props> = (props) => {
  const { testText } = props

  useEffect(() => {
    action.initPage()
  }, [])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.text}>{testText}</div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const data: StateInterface = state[NAME]
  return {
    testText: data.testText
  }
}

export default connect(mapStateToProps)(Test)
