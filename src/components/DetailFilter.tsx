import React, { useContext, useEffect } from 'react'
import { AppContext } from '../util/context'
import SelectPeriod from './SelectPeriod'
import { keyToRange } from '../util/dateCompute'
import styles from './index.module.less'
// import { DownOutlined } from '@ant-design/icons'
import { Space, Tabs } from 'antd'
const { TabPane } = Tabs

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  totalOptions?: Options
}
// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target='_blank' rel='noopener noreferrer' href='#'>
//         1st menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target='_blank' rel='noopener noreferrer' href='#'>
//         2nd menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target='_blank' rel='noopener noreferrer' href='#'>
//         3rd menu item
//       </a>
//     </Menu.Item>
//   </Menu>
// )

function DetailFilter({ totalOptions }: Props) {
  const { state: options, dispatch } = useContext(AppContext)

  // if outside default value exits
  if (totalOptions) {
    useEffect(() => {
      if (totalOptions.period !== 'all') {
        const newSate = {
          dateRange: totalOptions.dateRange,
          period: totalOptions.period
        }
        dispatch({
          type: 'filter',
          payload: newSate
        })
      }
    }, [])
  }

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

  return (
    <div className={styles.detailFilter}>
      <Tabs
        activeKey={options.period}
        tabBarExtraContent={
          <Space>
            <SelectPeriod />

            {/* <Dropdown overlay={menu} placement='bottomRight'>
              <a
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                展开
                <DownOutlined />
              </a>
            </Dropdown> */}
          </Space>
        }
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

export default DetailFilter
