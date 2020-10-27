import React, { useContext } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import { AppContext } from '../util/context'
import { checkPeriod } from '../util/dateCompute'

function SelectPeriod() {
  const { state: options, dispatch } = useContext(AppContext)
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY/MM/DD'

  const selectPeriod = (data: any, dateString: string[]) => {
    const period = checkPeriod(dateString[0], dateString[1])
    const newSate = {
      dateRange: [dateString[0], dateString[1]],
      period: period
    }
    dispatch({
      type: 'selectPeriod',
      payload: newSate
    })
  }

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current > moment().endOf('day')
  }

  if (options.period === 'all') {
    return <RangePicker format={dateFormat} onChange={selectPeriod} />
  } else {
    return (
      // className={styles.selectPeriod}
      <RangePicker
        format={dateFormat}
        disabledDate={disabledDate}
        onChange={selectPeriod}
        value={[
          moment(options.dateRange[0], dateFormat),
          moment(options.dateRange[1], dateFormat)
        ]}
      />
    )
  }
}

export default SelectPeriod
