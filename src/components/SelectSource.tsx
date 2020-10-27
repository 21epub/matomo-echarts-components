import React, { useContext } from 'react'
import { Select } from 'antd'
import { AppContext } from '../util/context'
const { Option } = Select

function SelectSource() {
  const { state: options, dispatch } = useContext(AppContext)

  const selectSource = (value: string) => {
    const newSate = {
      source: value
    }
    dispatch({
      type: 'selectSource',
      payload: newSate
    })
  }

  return (
    <Select
      defaultValue='allSource'
      value={options.source}
      style={{ width: 200 }}
      onChange={selectSource}
    >
      <Option value='allSource'>所有来源</Option>
      <Option value='direct'>直接链接</Option>
      <Option value='search'>搜索引擎</Option>
      <Option value='website'>网站</Option>
      <Option value='social'>社交网络</Option>
      <Option value='campaign'>广告活动</Option>
    </Select>
  )
}

export default SelectSource
