import React, { useContext, useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'
import { AppContext } from '../util/context'

function SelectYear() {
  const { state: options, dispatch } = useContext(AppContext)
  const [date, setDate] = useState(options.year)

  const selectPeriod = (date: any, dateString: string) => {
    const year = dateString

    setDate(year)
    if (year.length !== 0 && date !== null) {
      const newSate = {
        year: year
      }
      dispatch({
        type: 'selectPeriod',
        payload: newSate
      })
    }
  }

  function disabledDate(current: any) {
    return current < moment('2020') || current > moment().endOf('day')
  }

  if (date?.length === 0) {
    return (
      <Space size='middle'>
        <h4 className='year' style={{ fontSize: '15px' }}>
          年份：
        </h4>
        <DatePicker
          picker='year'
          disabledDate={disabledDate}
          onChange={selectPeriod}
          style={{ width: '90px' }}
        />
      </Space>
    )
  } else {
    return (
      <Space size='middle'>
        <h4 className='year' style={{ fontSize: '15px' }}>
          年份：
        </h4>
        <DatePicker
          picker='year'
          disabledDate={disabledDate}
          onChange={selectPeriod}
          value={moment(date)}
          style={{ width: '90px' }}
        />
      </Space>
    )
  }
}

export default SelectYear
