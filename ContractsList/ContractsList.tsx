import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './contracts_list.module.scss'
import { IRole } from '../../models/IRole'
import { IContract } from '../../models/IContract'
import { SortsAndFilters } from './SortsAndFilters'
import { TileList } from './TileList'
import { TableList } from './TableList'
import { NoProjects } from '../NoProjects'

interface ContractsListProps {
  contractActive: number
  setContractActive: React.Dispatch<React.SetStateAction<number>>
  contracts: { role: IRole; contract: IContract }[]
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
}

const ContractsList: React.FC<ContractsListProps> = ({
  contractActive,
  setContractActive,
  contracts,
  setContracts,
}) => {
  const [filter, setFilter] = useState<string>('Все документы')
  const [sort, setSort] = useState<string>('Самые новые первые')
  const [listStyle, setListStyle] = useState<boolean>(false)
  const [contractsList, setContractsList] =
    useState<{ role: IRole; contract: IContract }[]>(contracts)
  const [isReverse, setIsReverse] = useState(false)

  const sortMethod = useCallback(
    (
      a: { role: IRole; contract: IContract },
      b: { role: IRole; contract: IContract }
    ) => {
      if (sort === 'Алфавитный') {
        return a.contract.name > b.contract.name ? 1 : -1
      }
      if (sort === 'Дата создания' || sort === 'Самые новые первые') {
        return a.contract.createdAt < b.contract.createdAt ? 1 : -1
      }
      if (sort === 'Последний просмотренный') {
        return a.contract.updatedAt < b.contract.updatedAt ? 1 : -1
      }
      if (sort === 'Самые старые первые') {
        return a.contract.createdAt > b.contract.createdAt ? 1 : -1
      }
    },
    [sort]
  )

  useEffect(() => {
    setContractsList(
      contracts
        .filter((contract) => {
          if (filter === 'Мои') return contract.role.role
          if (filter === 'Скачанные') return contract.role.visitorRole
          return contract
        })
        .sort(sortMethod)
    )
  }, [contracts, filter, sortMethod])

  return (
    <div className={styles.contracts_list}>
      <table className={styles.contracts_list__table}>
        <SortsAndFilters
          setListStyle={setListStyle}
          listStyle={listStyle}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          isReverse={isReverse}
          setIsReverse={setIsReverse}
        />
        {listStyle && (
          <TableList
            contractsList={
              isReverse ? contractsList.slice().reverse() : contractsList
            }
            sort={
              sort === 'Последний просмотренный' ? 'updatedAt' : 'createdAt'
            }
            contractActive={contractActive}
            setContractActive={setContractActive}
            setContracts={setContracts}
          />
        )}
      </table>
      {!listStyle && (
        <TileList
          sort={sort === 'Последний просмотренный' ? 'updatedAt' : 'createdAt'}
          contractsList={contractsList}
          contractActive={contractActive}
          setContractActive={setContractActive}
          setContracts={setContracts}
        />
      )}
      {!contractsList.length && (
        <NoProjects
          createContract={null}
          isOwn={filter === 'Мои'}
          isDownloaded={filter === 'Скачанные'}
        />
      )}
    </div>
  )
}

export default observer(ContractsList)
