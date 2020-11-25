import React, { useContext } from 'react'
import { AppContext } from '../util/context'
import styles from './index.module.less'
import { Tabs } from 'antd'
const { TabPane } = Tabs

interface Props {
  isOrgSelection?: boolean
  isTongjiSelection?: boolean
  isPeriodSelection?: boolean
}

function OpeFilter({
  isOrgSelection = false,
  isTongjiSelection = false,
  isPeriodSelection = false
}: Props) {
  const { state: options, dispatch } = useContext(AppContext)

  const filter = (key: string) => {
    const selection = key
    const newSate = {
      selection: selection
    }
    dispatch({
      type: 'filter',
      payload: newSate
    })
  }

  const orgFilter = (key: string) => {
    const org = key
    const newSate = {
      org: org
    }
    dispatch({
      type: 'filter',
      payload: newSate
    })
  }

  if (isOrgSelection === true) {
    return (
      <div className={styles.filter}>
        <Tabs activeKey={options.org} onChange={orgFilter}>
          <TabPane tab='按分行统计' key='branch' />
          <TabPane tab='按总行统计' key='total' />
        </Tabs>
      </div>
    )
  } else if (isTongjiSelection === true) {
    return (
      <div className={styles.filter}>
        <Tabs activeKey={options.selection} onChange={filter}>
          <TabPane tab='按日期统计' key='day' />
          <TabPane tab='按月统计' key='month' />
          <TabPane tab='按年统计' key='year' />
        </Tabs>
      </div>
    )
  } else if (isPeriodSelection === true) {
    return (
      <div className={styles.periodFilter}>
        <Tabs activeKey={options.selection} onChange={filter}>
          <TabPane tab='当天' key='day' />
          <TabPane tab='当月' key='month' />
          <TabPane tab='本年' key='year' />
        </Tabs>
      </div>
    )
  } else {
    return <div>OpeFilter</div>
  }
}

export default OpeFilter
