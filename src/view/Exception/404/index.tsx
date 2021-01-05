/**
 * @module Exception404
 */
import styles from './style.less'

export default () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.text}>404</div>
        </div>
      </div>
    </>
  )
}
