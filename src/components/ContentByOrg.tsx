import React from 'react'
import { Table, Card, Spin } from 'antd'
import useSWR from 'swr'
// import styles from './index.module.less'

interface Props {
  url: string
  year: string
}

// operation tongji detail
function ContentByOrg({ url, year }: Props) {
  const newUrl = `${url}?year=${year}`

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements && elements.length !== 0) {
    // const keylist = Object.keys(elements[0])
    const columns = [
      {
        title: '机构',
        dataIndex: 'label',
        key: 'label',
        width: `${100 / 6}%`,
        align: 'center' as 'center'
      },
      {
        title: '创意模版',
        dataIndex: 'template',
        key: 'template',
        align: 'center' as 'center',
        children: [
          {
            title: '制作数量',
            dataIndex: 'template_make_number',
            key: 'template_make_number',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '发布数量',
            dataIndex: 'template_release_number',
            key: 'template_release_number',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '总访问量',
            dataIndex: 'total_visits',
            key: 'total_visits',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '平均访问量',
            dataIndex: 'ave_visits',
            key: 'ave_visits',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          }
        ]
      },
      {
        title: '海报图片数量',
        dataIndex: 'poster_number',
        key: 'poster_number',
        width: `${100 / 6}%`,
        align: 'center' as 'center'
      }
    ]

    const data = []

    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
      data[i] = elements[i]
    }

    return (
      <div style={{ textAlign: 'right' }}>
        <Card>
          <p>年份： {year}</p>
          <Table columns={columns} dataSource={data} bordered />
        </Card>
      </div>
    )
  } else if (elements && elements.length === 0) {
    return (
      <div>
        <Card>
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

export default ContentByOrg
