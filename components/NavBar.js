import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import classNames from 'classnames'

export default function NavBar() {
  const pages = [
    {path: '/about', name: 'About'},
    {path: '/social_and_github', name: 'Social & Github'},
    {path: '/ibc', name: 'IBC'},
    {path: '/validators', name: 'Validators'},
    {path: '/smart_contracts', name: 'Smart Contracts'},
    {path: '/blocks_and_txs', name: 'Blocks & Txs'},
    {path: '/economics', name: 'Economics'}
  ]

  const { asPath } = useRouter()
  const isMain = asPath === '/'
  const links = isMain ? pages.filter(p => p.path === '/about') : pages
  const [isClicked, setIsClicked] = useState(false)
  const onClick = () => { setIsClicked((prevState) => { return !prevState }) }
  const isMobile = window.innerWidth < 600

  return (
      <>
        <div className={classNames(styles.burgerMenu, { [styles.hidden]: !isMobile || isMain })} onClick={onClick}>
          <div className={classNames(styles.burgerLine, { [styles.clicked]: isClicked })}></div>
          <div className={classNames(styles.burgerLine, isClicked ? styles.clicked : styles.unclicked)}></div>
          <div className={classNames(styles.burgerLine, { [styles.clicked]: isClicked })}></div>
        </div>
        <div className={styles.navMain}>
          { links.map(l => {
              const isActive = asPath === l.path
              const isAbout = '/about' === l.path

              return <Link key={l.name} href={l.path}>
                    <a className={
                      classNames(
                        { [styles.isActiveLink]: isActive },
                        { [styles.hidden]: isMobile && !isClicked },
                        { [styles.displayAboutLink]: isMobile && isAbout && isMain }
                      )}>{l.name}</a>
                  </Link>
          }) }
        </div>
      </>
  )
}
