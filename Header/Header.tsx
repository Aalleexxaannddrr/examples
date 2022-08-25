import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './header.module.scss'
import { Tabs } from './Tabs'

interface HeaderProps {
  createContract: () => void
}

const Header: React.FC<HeaderProps> = ({ createContract }) => {
  return (
    <div className={styles.header}>
      <Tabs createContract={createContract} />
      <div className={styles.header__user}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="11" fill="white" />
          <path
            d="M16 17V15.6667C16 14.9594 15.719 14.2811 15.219 13.781C14.7189 13.281 14.0406 13 13.3333 13H8.66667C7.95942 13 7.28115 13.281 6.78105 13.781C6.28095 14.2811 6 14.9594 6 15.6667V17"
            stroke="#BBBBBB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
            stroke="#BBBBBB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L4 4L7 1"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default observer(Header)
