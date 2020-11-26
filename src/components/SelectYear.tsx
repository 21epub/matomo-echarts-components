import React, { useContext } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'
import { AppContext } from '../util/context'

function SelectYear() {
  const { state: options, dispatch } = useContext(AppContext)

  const selectPeriod = (date: any, dateString: string) => {
    const year = dateString
    const newSate = {
      year: year
    }
    dispatch({
      type: 'selectPeriod',
      payload: newSate
    })
  }

  function disabledDate(current: any) {
    return current < moment('2020') || current > moment().endOf('day')
  }

  return (
    <Space size='middle'>
      <h4 className='year' style={{ fontSize: '15px' }}>
        年份：
      </h4>
      <DatePicker
        picker='year'
        disabledDate={disabledDate}
        onChange={selectPeriod}
        defaultValue={moment(options.year)}
        style={{ width: '90px' }}
      />
    </Space>
  )
}

export default SelectYear
