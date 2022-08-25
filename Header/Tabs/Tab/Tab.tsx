import React from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import styles from './tab.module.scss'

export interface TabProps {
  tab: { id: number; name: string; isActive: boolean }
  swipeTab: (id: number, e) => void
  closeTab: (id: number) => void
}

const Tab: React.FC<TabProps> = ({ tab, swipeTab, closeTab }) => {
  return (
    <button
      className={classNames(styles.tab, {
        [styles.tab_selected]: tab.isActive,
      })}
      onClick={(e) => swipeTab(tab.id, e)}
      role="tab"
      aria-selected={tab.isActive}
    >
      <p
        className={classNames(styles.tab__name, {
          [styles.tab__name_active]: tab.isActive,
        })}
      >
        {tab.name}
      </p>
      <span
        className={classNames(styles.tab__close, {
          [styles.tab__close_active]: tab.isActive,
        })}
        onClick={() => closeTab(tab.id)}
        aria-label="close"
        role="button"
      />
    </button>
  )
}

export default observer(Tab)
