import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { IRole } from '../../../models/IRole'
import { IContract } from '../../../models/IContract'
import styles from './tile.module.scss'
import { RoleRus } from '../../../utils/consts'
import classNames from 'classnames'
import { Context } from '../../../index'
import useChangeContractName from '../../../hooks/useChangeContractName'

interface TileProps {
  contract: { role: IRole; contract: IContract }
  contractActive: number
  setContractActive: React.Dispatch<React.SetStateAction<number>>
  previewName: string
  isImgLoaded: boolean
  setIsImgLoaded: React.Dispatch<React.SetStateAction<boolean>>
  date: string
  onContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  isNameChange: boolean
  nameInputRef: React.MutableRefObject<any>
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
}

const Tile: React.FC<TileProps> = ({
  contract,
  contractActive,
  setContractActive,
  previewName,
  isImgLoaded,
  setIsImgLoaded,
  date,
  onContextMenu,
  isNameChange,
  nameInputRef,
  setContracts,
}) => {
  const { store } = useContext(Context)

  const changeName = useChangeContractName(store, contract.contract.id)

  return (
    <div
      className={classNames(styles.tile, {
        [styles.tile_active]: contractActive === contract.contract.id,
      })}
      onClick={() => setContractActive(contract.contract.id)}
      onContextMenu={onContextMenu}
      onDoubleClick={() =>
        store.openContract(contract.contract.id, contract.contract.name)
      }
    >
      <img
        className={styles.tile__preview}
        src={`http://localhost:5000/contract${contract.contract.id}/preview/${previewName}`}
        alt="preview"
        onLoad={() => setIsImgLoaded(true)}
        onError={() => setIsImgLoaded(false)}
      />
      {isImgLoaded === false && <div className={styles.tile__preview_sub} />}
      <div className={styles.tile__info}>
        <div className={styles.tile__left}>
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H14.5L20 5.21739V24H0V0Z" fill="#18A0FB" />
            <path d="M14.5 5V0L20 5H14.5Z" fill="#9BD5FD" />
          </svg>
          <div className={styles.tile__text_info}>
            <input
              className={styles.tile__name}
              ref={nameInputRef}
              type="text"
              value={contract.contract.name}
              onChange={(event) => changeName(setContracts, event.target.value)}
              disabled={!isNameChange}
            />
            <p className={styles.tile__role}>
              Вы - {RoleRus[contract.role.role]}
            </p>
          </div>
        </div>
        <p className={styles.tile__date}>{date}</p>
      </div>
    </div>
  )
}

export default observer(Tile)
