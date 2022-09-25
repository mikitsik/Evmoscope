import styles from '../styles/Home.module.css'
import SearchLogo from './SearchLogo'
import { useState } from 'react'
import classNames from 'classnames'

export default function Search() {
  const [isFocus, setIsFocus] = useState(false)
  const onFocus = () => { setIsFocus(true) }
  const onBlur = (e) => {
    setIsFocus(false)
    e.target.value = ''
  }

  return (
    <div className={classNames(styles.search, { [styles.isFocus]: isFocus })}>
      <div className={classNames(styles.searchBorder, { [styles.isFocus]: isFocus })}></div>
      <input
        type="text"
        placeholder='Search by Address, Block, TxHash...'
        onFocus={onFocus}
        onBlur={onBlur}
        // onChange={handleChange}
      />
      <div className={classNames(styles.searchBorder, { [styles.isFocus]: isFocus })}></div>
      <span>
        <SearchLogo width="30" height="30" />
      </span>
    </div>
  )
}
