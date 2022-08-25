import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './tabs.module.scss'
import classNames from 'classnames'
import { Context } from '../../../index'
import { Tab } from './Tab'

interface TabsProps {
  createContract: () => void
}

const Tabs: React.FC<TabsProps> = ({ createContract }) => {
  const { store } = useContext(Context)

  const swipeTab = (id: number, e) => {
    if (
      e.target.className.baseVal &&
      e.target.className.baseVal.includes('close')
    )
      return
    store.swipeTab(id)
  }

  const closeTab = (id: number) => {
    store.closeTab(id)
  }

  return (
    <div className={styles.tabs}>
      <div
        className={classNames(styles.tabs__tab, {
          [styles.tabs__tab_selected]: store.tabs.slice()[0]?.isActive,
        })}
        onClick={(e) => swipeTab(null, e)}
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.tabs__svg, {
            [styles.tabs_svg_active]: store.tabs.slice()[0]?.isActive,
          })}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.156 1.55471C7.1117 1.51933 7.05669 1.50006 7 1.50006C6.94331 1.50006 6.8883 1.51933 6.844 1.55471L1.594 5.75471C1.56459 5.77819 1.54086 5.80802 1.52458 5.84195C1.50831 5.87589 1.4999 5.91307 1.5 5.95071V12.9697C1.5 13.1077 1.612 13.2197 1.75 13.2197H4.5V7.96971C4.5 7.77079 4.57902 7.58003 4.71967 7.43938C4.86032 7.29872 5.05109 7.21971 5.25 7.21971H8.75C8.94891 7.21971 9.1397 7.29872 9.2803 7.43938C9.421 7.58003 9.5 7.77079 9.5 7.96971V13.2197H12.25C12.3163 13.2197 12.3799 13.1934 12.4268 13.1465C12.4737 13.0996 12.5 13.036 12.5 12.9697V5.94971C12.4999 5.91224 12.4915 5.87526 12.4752 5.8415C12.4589 5.80775 12.4353 5.77809 12.406 5.75471L7.156 1.55471ZM5.906 0.383706C6.21634 0.135326 6.602 0 6.9995 0C7.397 0 7.78266 0.135326 8.093 0.383706L13.343 4.58371C13.758 4.9157 14 5.41871 14 5.95071V12.9697C14 13.4338 13.8156 13.8789 13.4874 14.2071C13.1592 14.5353 12.7141 14.7197 12.25 14.7197H8.75C8.55109 14.7197 8.36032 14.6407 8.21967 14.5C8.07902 14.3594 8 14.1686 8 13.9697V8.71971H6V13.9697C6 14.1686 5.92098 14.3594 5.78033 14.5C5.63968 14.6407 5.44891 14.7197 5.25 14.7197H1.75C1.28587 14.7197 0.84075 14.5353 0.51256 14.2071C0.18437 13.8789 0 13.4338 0 12.9697V5.94971C0 5.41871 0.242 4.9157 0.657 4.58371L5.907 0.383706H5.906Z"
            fill="white"
          />
        </svg>
      </div>
      {store.tabs.map((tab, index) => (
        <div key={tab.id}>
          {index !== 0 && (
            <Tab tab={tab} swipeTab={swipeTab} closeTab={closeTab} />
          )}
        </div>
      ))}
      <div
        className={classNames(styles.tabs__tab, {
          [styles.tabs__tab_selected]: !store.tabs.find((tab) => tab.isActive),
        })}
        onClick={createContract}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.tabs__svg, {
            [styles.tabs_svg_active]: !store.tabs.find((tab) => tab.isActive),
          })}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.59375 0.284459C5.76831 0.284752 5.93577 0.354328 6.05933 0.477895C6.1829 0.601462 6.25247 0.768917 6.25277 0.943483L6.25706 4.94307L10.2566 4.94736C10.3451 4.94436 10.4332 4.95917 10.5158 4.99094C10.5985 5.02271 10.6739 5.07077 10.7376 5.13228C10.8013 5.19378 10.852 5.26745 10.8867 5.34892C10.9213 5.43039 10.9392 5.51794 10.9393 5.60639C10.9394 5.6949 10.9217 5.78241 10.8872 5.86378C10.8527 5.94516 10.8022 6.01878 10.7386 6.08014C10.675 6.1415 10.5997 6.18943 10.5172 6.22101C10.4346 6.2526 10.3465 6.26722 10.2581 6.264L6.25847 6.25971L6.26276 10.2593C6.26596 10.3477 6.25134 10.4359 6.21975 10.5184C6.18817 10.601 6.14024 10.6763 6.07889 10.7399C6.01753 10.8034 5.94393 10.8539 5.86255 10.8884C5.78116 10.9229 5.69368 10.9407 5.60518 10.9405C5.51668 10.9405 5.42915 10.9226 5.34769 10.8879C5.26624 10.8532 5.19252 10.8026 5.13103 10.7388C5.06954 10.6751 5.02145 10.5997 4.98969 10.5171C4.95793 10.4345 4.94312 10.3463 4.94613 10.2579L4.94184 6.2583L0.942248 6.25401C0.77165 6.24781 0.610005 6.17563 0.491314 6.05272C0.372685 5.92974 0.306255 5.76567 0.30606 5.59499C0.305871 5.42432 0.371955 5.26036 0.490364 5.13769C0.608772 5.01501 0.77025 4.94322 0.940835 4.93737L4.94042 4.94166L4.93613 0.942071C4.93605 0.767511 5.00527 0.600199 5.12857 0.476897C5.25187 0.353595 5.41918 0.284384 5.59375 0.284459Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}

export default observer(Tabs)
