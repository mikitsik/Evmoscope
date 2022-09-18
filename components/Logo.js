import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Logo() {
  const [isHovering, setIsHovering] = useState(false)
  const onMouseEnter = () => setIsHovering(true)
  const onMouseLeave = () => setIsHovering(false)

  return (
    <div className={styles.header}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isHovering ? (
            <Link href="/">
              <a>
                <span>
                  <Image src="/logoBlue.svg" alt="Evmoscope Logo" width={345} height={90} />
                </span>
              </a>
            </Link>
          ) : (
            <Link href="/">
              <a>
                <span>
                  <Image src="/logo.svg" alt="Evmoscope Logo" width={345} height={90} />
                </span>
              </a>
            </Link>
          )}
      </div>
    </div>
  )
}
