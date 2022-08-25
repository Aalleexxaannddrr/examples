import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './list_style_selection.module.scss'
import classNames from 'classnames'

interface ListStyleSelectionProps {
  listStyle: boolean
  setListStyle: React.Dispatch<React.SetStateAction<boolean>>
}

const ListStyleSelection: React.FC<ListStyleSelectionProps> = ({
  listStyle,
  setListStyle,
}) => {
  return (
    <>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={!listStyle && styles.svg_active}
        onClick={() => setListStyle(false)}
      >
        <rect
          x="0.5"
          y="0.5"
          width="24.3239"
          height="24.3239"
          rx="2.5"
          stroke="#E5E5E5"
        />
        <rect
          x="6.21875"
          y="6.21826"
          width="5.53521"
          height="5.53521"
          stroke="#BBBBBB"
        />
        <rect
          x="13.5703"
          y="6.21826"
          width="5.53521"
          height="5.53521"
          stroke="#BBBBBB"
        />
        <rect
          x="6.21875"
          y="13.5703"
          width="5.53521"
          height="5.53521"
          stroke="#BBBBBB"
        />
        <rect
          x="13.5703"
          y="13.5703"
          width="5.53521"
          height="5.53521"
          stroke="#BBBBBB"
        />
      </svg>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(styles.svg, {
          [styles.svg_active]: listStyle,
        })}
        onClick={() => setListStyle(true)}
      >
        <rect
          x="1.17578"
          y="0.5"
          width="24.3239"
          height="24.3239"
          rx="2.5"
          stroke="#E5E5E5"
        />
        <path d="M6.39453 6.9436H20.2819" stroke="#BBBBBB" />
        <path d="M6.39453 12.2534H20.2819" stroke="#BBBBBB" />
        <path d="M6.39453 17.155H20.2819" stroke="#BBBBBB" />
      </svg>
    </>
  )
}

export default observer(ListStyleSelection)
