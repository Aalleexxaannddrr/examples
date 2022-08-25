import React from 'react'
import { observer } from 'mobx-react-lite'
import { IRole } from '../../../models/IRole'
import { IContract } from '../../../models/IContract'
import ContractsListItem from '../ContractsListItem/ContractsListItem'

interface TableListProps {
  contractsList: { role: IRole; contract: IContract }[]
  sort: string
  contractActive: number
  setContractActive: React.Dispatch<React.SetStateAction<number>>
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
}

const TableList: React.FC<TableListProps> = ({
  contractsList,
  sort,
  contractActive,
  setContractActive,
  setContracts,
}) => {
  return (
    <tbody>
      {contractsList.map((contract) => (
        <ContractsListItem
          setContracts={setContracts}
          contract={contract}
          contractActive={contractActive}
          setContractActive={setContractActive}
          sortDate={sort}
          isTile={false}
        />
      ))}
    </tbody>
  )
}

export default observer(TableList)
