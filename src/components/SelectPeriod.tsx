import React, { useContext } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import { AppContext } from './context'
import { checkPeriod } from './dateCompute'
// import styles from './index.module.less';

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

  if (options.period === 'all') {
    return <RangePicker format={dateFormat} onChange={selectPeriod} />
  } else {
    return (
      // className={styles.selectPeriod}
      <RangePicker
        format={dateFormat}
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
