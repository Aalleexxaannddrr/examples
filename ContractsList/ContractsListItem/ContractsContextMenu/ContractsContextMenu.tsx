import React, { useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './contracts_context_menu.module.scss'
import { createPortal } from 'react-dom'
import useCloseModal from '../../../../hooks/useCloseModal'
import ContractService from '../../../../services/ContractService'
import { Context } from '../../../../index'
import { IContract } from '../../../../models/IContract'

interface ContractsContextMenuProps {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsNameChange: React.Dispatch<React.SetStateAction<boolean>>
  setIsAccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  numberOfRequest: number
  contract: IContract
}

const ContractsContextMenu: React.FC<ContractsContextMenuProps> = ({
  isActive,
  setIsActive,
  setIsNameChange,
  setIsAccessModalOpen,
  numberOfRequest,
  contract,
}) => {
  const { store, editorStore } = useContext(Context)
  const contextMenuRef = useRef(null)

  useCloseModal(contextMenuRef, isActive, setIsActive)

  const openContract = () => {
    for (const tab of store.tabs) {
      if (tab.id === contract.id) {
        store.swipeTab(tab.id)
        return
      }
    }
    store.addTab({ id: contract.id, name: contract.name, isActive: false })
    store.swipeTab(contract.id)
  }

  const editName = () => {
    setIsNameChange(true)
    setIsActive(false)
  }

  const openAccessModal = () => {
    setIsAccessModalOpen(true)
    setIsActive(false)
  }

  const deleteContract = async () => {
    store.setTabs(store.tabs.filter((tab) => tab.id !== contract.id))
    localStorage.setItem('tabs', JSON.stringify(store.tabs))
    await ContractService.delete(contract.id)
    document.location.reload()
  }

  if (!isActive) return null

  return createPortal(
    <ul
      ref={contextMenuRef}
      className={styles.context_menu}
      style={{
        left: `${editorStore.coordinates.x}px`,
        top: `${editorStore.coordinates.y}px`,
      }}
    >
      <li className={styles.context_menu__item} onClick={openContract}>
        Открыть
      </li>
      <li className={styles.context_menu__item} onClick={editName}>
        Переименовать
      </li>
      <li className={styles.context_menu__item} onClick={openAccessModal}>
        Настроить доступ
        {numberOfRequest !== 0 && (
          <h5 className={styles.number_of_request}>{numberOfRequest}</h5>
        )}
      </li>
      <li className={styles.context_menu__item} onClick={deleteContract}>
        Удалить
      </li>
    </ul>,
    document.getElementById('context-menu')
  )
}

export default observer(ContractsContextMenu)
