import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function DevelopingPage() {
  return (
    <div className={styles.developingPage}>
      <div className={styles.developingLeft}>
        <Image src="/dev.svg" alt="heart" width={50} height={50} />
      </div>
      <h3>This page is under development</h3>
    </div>
  )
}
