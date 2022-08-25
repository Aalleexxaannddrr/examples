import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './table_item.module.scss'
import { IRole } from '../../../models/IRole'
import { IContract } from '../../../models/IContract'
import { RoleRus } from '../../../utils/consts'
import classNames from 'classnames'
import { Context } from '../../../index'
import useChangeContractName from '../../../hooks/useChangeContractName'

interface TableItemProps {
  contract: { role: IRole; contract: IContract }
  contractActive: number
  setContractActive: React.Dispatch<React.SetStateAction<number>>
  isImgLoaded: boolean
  previewName: string
  setIsImgLoaded: React.Dispatch<React.SetStateAction<boolean>>
  date: string
  onContextMenu: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  nameInputRef: React.MutableRefObject<any>
  isNameChange: boolean
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
}

const TableItem: React.FC<TableItemProps> = ({
  contract,
  contractActive,
  setContractActive,
  isImgLoaded,
  previewName,
  setIsImgLoaded,
  date,
  onContextMenu,
  nameInputRef,
  isNameChange,
  setContracts,
}) => {
  const { store } = useContext(Context)

  const changeName = useChangeContractName(store, contract.contract.id)

  return (
    <tr
      key={contract.contract.id}
      className={classNames(styles.table_item, {
        [styles.table_item_active]: contractActive === contract.contract.id,
      })}
      onClick={() => {
        setContractActive(contract.contract.id)
      }}
      onContextMenu={onContextMenu}
      onDoubleClick={() =>
        store.openContract(contract.contract.id, contract.contract.name)
      }
    >
      <td className={styles.table_item__first_td}>
        <img
          className={classNames(styles.table_item__preview, {
            [styles.table_item__preview_none]: isImgLoaded === false,
          })}
          src={`http://localhost:5000/contract${contract.contract.id}/preview/${previewName}`}
          alt="preview"
          onLoad={() => setIsImgLoaded(true)}
          onError={() => setIsImgLoaded(false)}
        />
        {isImgLoaded === false && (
          <div className={styles.table_item__preview_sub} />
        )}
        <input
          className={styles.table_item__name_input}
          ref={nameInputRef}
          type="text"
          value={contract.contract.name}
          onChange={(event) => changeName(setContracts, event.target.value)}
          disabled={!isNameChange}
        />
      </td>
      <td className={styles.table_item__second_td}>{date}</td>
      <td className={styles.table_item__last_td}>
        Вы - {RoleRus[contract.role.role]}
      </td>
    </tr>
  )
}

export default observer(TableItem)
