import React, { useContext } from 'react'
import { AppContext } from '../util/context'
import SelectPeriod from './SelectPeriod'
import { keyToRange } from '../util/dateCompute'
import styles from './index.module.less'
import { Tabs } from 'antd'
const { TabPane } = Tabs

interface Props {
  isOrgVersion?: boolean
  isHomePageVersion?: boolean
}

function Filter({ isOrgVersion = false, isHomePageVersion = false }: Props) {
  const { state: options, dispatch } = useContext(AppContext)

  const filter = (key: string) => {
    const period = key
    if (key === 'all') {
      const newstate = {
        period: period
      }
      dispatch({
        type: 'filter',
        payload: newstate
      })
    } else {
      const newRange = keyToRange(key)
      const newSate = {
        dateRange: newRange,
        period: period
      }
      dispatch({
        type: 'filter',
        payload: newSate
      })
    }
  }

  if (isOrgVersion === true) {
    return (
      <div className={styles.filter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' />
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          <TabPane tab='近一年' key='last365' />
          <TabPane tab='本年' key='thisyear' />
          <TabPane tab='全部' key='total' />
        </Tabs>
      </div>
    )
  } else if (isHomePageVersion === true) {
    return (
      <div className={styles.homePageFilter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          // tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          {/* <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' /> */}
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          {/* <TabPane tab='本年' key='thisyear' /> */}
          <TabPane tab='全部' key='total' />
        </Tabs>
      </div>
    )
  } else {
    return (
      <div className={styles.filter}>
        <Tabs
          defaultActiveKey='today'
          activeKey={options.period}
          tabBarExtraContent={<SelectPeriod />}
          onChange={filter}
        >
          <TabPane tab='今日' key='today' />
          <TabPane tab='昨日' key='yesterday' />
          <TabPane tab='近7日' key='last7' />
          <TabPane tab='近15日' key='last15' />
          <TabPane tab='近30日' key='last30' />
          <TabPane tab='本年' key='thisyear' />
          <TabPane tab='全部' key='all' />
        </Tabs>
      </div>
    )
  }
}

export default Filter
