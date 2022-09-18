import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made with
      <span className={styles.logo}>
        <Image src="/heart.svg" alt="heart" width={40} height={16} />
      </span>
      <a
        href="https://evmos.org/"
        target="_blank"
        rel="noopener noreferrer"
      >to Evmos</a>
    </footer>
  )
}
