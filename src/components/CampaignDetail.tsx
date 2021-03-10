import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import { titleTranslate } from '../util/util'
import useSWR from 'swr'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  labelUrl: string
  options: Options
  detailType: string
  createTime?: string
  extra?: React.ReactNode[]
  isOrg?: boolean
}

function CampaignDetail({
  url,
  labelUrl,
  options,
  detailType,
  createTime,
  extra,
  isOrg = false
}: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  let newUrl = ''

  if (period !== 'all' && startDate && endDate) {
    newUrl = `${url}?period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  } else if (createTime !== '') {
    newUrl = `${url}?period=${period}&start_time=${createTime}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  let { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  const { data: res } = useSWR(labelUrl, fetcher, swrOptions)
  const labelList = res?.data?.results

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  // 机构数据暂时不开放
  if (isOrg) elements = []
  if (elements?.length && labelList?.length) {
    const keylist = Object.keys(elements[0])
    const columns = []
    for (let i = 0; i < keylist.length; i++) {
      columns[i] = {
        title: titleTranslate(`${detailType}${keylist[i]}`),
        dataIndex: keylist[i]
      }
    }
    const getLabelName = (labelId: string) => {
      const labelItem = labelList.filter((item: any) => item.id === labelId)
      return labelItem[0].name
    }

    elements = elements.map((it: any) => {
      const labelId = String(it.label).substr(0, String(it.label).length - 1)
      const labelName = getLabelName(labelId)
      return { label: labelName, nb_visits: it.nb_visits }
    })

    // 倒序
    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
    }

    return (
      <div className={styles.trendDetail}>
        <Card
          title='详细数据列表'
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <div>{extra}</div>
            </Space>
          }
        >
          <Table columns={columns} dataSource={elements} />
        </Card>
      </div>
    )
  } else if (elements?.length === 0) {
    return (
      <div className={styles.noDataTrendDetail}>
        <Card
          title='详细数据列表'
          extra={<p className='daterange'>{daterangeContent}</p>}
        >
          <h1>暂无数据</h1>
        </Card>
      </div>
    )
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default CampaignDetail
