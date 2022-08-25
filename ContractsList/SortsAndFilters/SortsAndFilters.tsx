import React from 'react'
import { observer } from 'mobx-react-lite'
import styles from './sorts_and_filters.module.scss'
import { Select } from '../../Select'
import { ListStyleSelection } from './ListStyleSelection'

interface SortsAndFiltersProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  listStyle: boolean
  setListStyle: React.Dispatch<React.SetStateAction<boolean>>
  isReverse: boolean
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>
}

const SortsAndFilters: React.FC<SortsAndFiltersProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
  listStyle,
  setListStyle,
  isReverse,
  setIsReverse,
}) => {
  return (
    <thead className={styles.sorts_and_filters}>
      <tr className={styles.sorts_and_filters__tr}>
        <th className={styles.sorts_and_filters__th}>
          <div className={styles.sorts_and_filters__filters}>
            {listStyle && (
              <p className={styles.sorts_and_filters__document_name}>
                Имя документа
              </p>
            )}
            <Select
              title={'Фильтры:'}
              variations={['Все документы', 'Мои', 'Скачанные']}
              value={filter}
              setValue={setFilter}
              isBig={false}
              isWeight={false}
            />
          </div>
        </th>
        {listStyle && (
          <th
            className={styles.sorts_and_filters__th}
            onClick={() => setIsReverse(!isReverse)}
          >
            {sort === 'Последний просмотренный' ? (
              <>Дата просмотра</>
            ) : (
              <>Дата создания</>
            )}
            <svg
              width="7"
              height="11"
              viewBox="0 0 7 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.sorts_and_filters__arrow_svg}
              transform={isReverse && 'rotate(180)'}
            >
              <path
                d="M1 7.6L3.5 10M3.5 10L6 7.6M3.5 10V1"
                stroke="#BBBBBB"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </th>
        )}
        <th className={styles.sorts_and_filters__sorts}>
          <Select
            title={'Сортировать:'}
            variations={[
              'Алфавитный',
              'Дата создания',
              'Последний просмотренный',
              'Самые старые первые',
              'Самые новые первые',
            ]}
            value={sort}
            setValue={setSort}
            isBig={false}
            isWeight={false}
          />
          <ListStyleSelection
            listStyle={listStyle}
            setListStyle={setListStyle}
          />
        </th>
      </tr>
    </thead>
  )
}

export default observer(SortsAndFilters)
