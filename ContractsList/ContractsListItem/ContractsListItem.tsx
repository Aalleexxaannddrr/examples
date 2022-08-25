import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { observer } from 'mobx-react-lite'
import ContractService from '../../../services/ContractService'
import { Tile } from '../Tile'
import { IRole } from '../../../models/IRole'
import { IContract } from '../../../models/IContract'
import { TableItem } from '../TableItem'
import useDate from '../../../hooks/useDate'
import ContractsContextMenu from './ContractsContextMenu'
import useCloseModal from '../../../hooks/useCloseModal'
import { Context } from '../../../index'
import AccessSettings from '../../AccessSettings'
import { Modal } from '../../Modal'

interface ContractsListItemProps {
  contract: { role: IRole; contract: IContract }
  sortDate: string
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
  setContractActive: React.Dispatch<React.SetStateAction<number>>
  contractActive: number
  isTile: boolean
}

const ContractsListItem: React.FC<ContractsListItemProps> = ({
  contract,
  sortDate,
  setContracts,
  contractActive,
  setContractActive,
  isTile,
}) => {
  const { store, editorStore } = useContext(Context)
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(null)
  const [previewName, setPreviewName] = useState<string>(null)
  const [isContextMenuActive, setIsContextMenuActive] = useState<boolean>(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false)
  const date = useDate(contract.contract[sortDate], isTile)
  const [isNameChange, setIsNameChange] = useState<boolean>(false)
  const nameInputRef = useRef(null)

  useCloseModal(nameInputRef, isNameChange, setIsNameChange)

  useEffect(() => {
    const sliceEnd = String(new Date(contract.contract.updatedAt)).indexOf(
      'GMT'
    )
    setPreviewName(
      `${String(new Date(contract.contract.updatedAt))
        .slice(0, sliceEnd)
        .trim()
        .replace(/\s/g, '')
        .replace(':', '')
        .replace(':', '')}.png`
    )
  }, [contract.contract.updatedAt])

  const makePreview = useCallback(async () => {
    try {
      const newUpdatedAt = await ContractService.makeContractPreview(
        contract.contract.id
      )
      setContracts((prevState) =>
        prevState.map((item) =>
          item.contract.id !== contract.contract.id
            ? item
            : {
                ...item,
                contract: { ...item.contract, updatedAt: newUpdatedAt.data },
              }
        )
      )
    } catch (e) {
      console.log(e)
    }
  }, [contract.contract.id, setContracts])

  useEffect(() => {
    if (isImgLoaded !== false) return
    makePreview().catch()
  }, [isImgLoaded, makePreview])

  const onContextMenu = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    event.preventDefault()
    setContractActive(contract.contract.id)
    editorStore.setCoordinates({ x: event.clientX, y: event.clientY })
    setIsContextMenuActive(true)
  }

  useEffect(() => {
    if (isNameChange) nameInputRef.current.focus()
  }, [isNameChange])

  return (
    <>
      {isTile ? (
        <Tile
          date={date}
          setIsImgLoaded={setIsImgLoaded}
          previewName={previewName}
          contract={contract}
          contractActive={contractActive}
          setContractActive={setContractActive}
          isImgLoaded={isImgLoaded}
          onContextMenu={onContextMenu}
          isNameChange={isNameChange}
          nameInputRef={nameInputRef}
          setContracts={setContracts}
        />
      ) : (
        <TableItem
          date={date}
          setIsImgLoaded={setIsImgLoaded}
          previewName={previewName}
          contract={contract}
          contractActive={contractActive}
          setContractActive={setContractActive}
          isImgLoaded={isImgLoaded}
          onContextMenu={onContextMenu}
          nameInputRef={nameInputRef}
          isNameChange={isNameChange}
          setContracts={setContracts}
        />
      )}
      <ContractsContextMenu
        isActive={isContextMenuActive}
        setIsActive={setIsContextMenuActive}
        numberOfRequest={0}
        setIsAccessModalOpen={setIsAccessModalOpen}
        setIsNameChange={setIsNameChange}
        contract={contract.contract}
      />
      <Modal
        isActive={isAccessModalOpen}
        setIsActive={setIsAccessModalOpen}
        component={
          <AccessSettings
            contract={contract.contract}
            contractUsers={[]}
            setContractUsers={null}
            isLoaded={store.isLoading}
            setIsLoaded={store.setLoading}
          />
        }
      />
    </>
  )
}

export default observer(ContractsListItem)
