import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './tile_list.module.scss'
import { IRole } from '../../../models/IRole'
import { IContract } from '../../../models/IContract'
import ContractsListItem from '../ContractsListItem'

interface ListProps {
  contractsList: { role: IRole; contract: IContract }[]
  setContracts: React.Dispatch<
    React.SetStateAction<{ role: IRole; contract: IContract }[]>
  >
  sort: string
  contractActive: number
  setContractActive: React.Dispatch<React.SetStateAction<number>>
}

const TileList: React.FC<ListProps> = ({
  contractsList,
  sort,
  contractActive,
  setContractActive,
  setContracts,
}) => {
  return (
    <div className={styles.list}>
      <div className={styles.list__tile}>
        {contractsList.map((contract) => (
          <div key={contract.contract.id}>
            <ContractsListItem
              setContracts={setContracts}
              contract={contract}
              contractActive={contractActive}
              setContractActive={setContractActive}
              sortDate={sort}
              isTile={true}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default observer(TileList)
