import React from 'react'
import { IRole } from '../models/IRole'
import { IContract } from '../models/IContract'
import ContractService from '../services/ContractService'
import useDebounce from './useDebounce'
import Store from '../store/store'

const useChangeContractName = (store: Store, contractId: number) => {
  const contractNameChange = async (newName: string) => {
    await ContractService.change(contractId, newName, null)
  }

  const debouncedNameChange = useDebounce(contractNameChange, 500)

  return (
    setContractList: React.Dispatch<
      React.SetStateAction<{ role: IRole; contract: IContract }[]>
    >,
    newContractName: string
  ) => {
    setContractList((prevState) =>
      prevState.map((item) =>
        item.contract.id === contractId
          ? {
              ...item,
              contract: { ...item.contract, name: newContractName },
            }
          : item
      )
    )
    store.setTabs(
      store.tabs.map((tab) =>
        tab.id === contractId ? { ...tab, name: newContractName } : tab
      )
    )
    localStorage.setItem('tabs', JSON.stringify(store.tabs))
    debouncedNameChange(newContractName)
  }
}

export default useChangeContractName
