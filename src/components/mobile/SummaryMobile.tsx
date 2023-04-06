import React from 'react'
import { Card, Row, Col, Spin } from 'antd'
import useSWR from 'swr'
import { secondToTime } from '../../util/dateCompute'

interface Props {
  url: string
  createTime: string
}

function SummaryMobile({ url, createTime }: Props) {
  let newUrl = ''
  if (createTime !== '') {
    newUrl = `${url}?start_time=${createTime}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements?.today) {
    const content = []
    const spanList = [6, 6, 6]
    const titleList = ['今日', '昨日', '总']
    const pvList = [
      elements.today.nb_hits,
      elements.yesterday.nb_hits,
      elements.total.nb_hits
    ]
    const uvList = [
      elements.today.nb_uniq_visitors,
      elements.yesterday.nb_uniq_visitors,
      elements.total.nb_uniq_visitors
    ]

    const forwardingList = [
      elements.today.forwarding_number,
      elements.yesterday.forwarding_number,
      elements.total.forwarding_number
    ]

    const avgTimeList = [
      secondToTime(elements.today.avg_time_on_page),
      secondToTime(elements.yesterday.avg_time_on_page),
      secondToTime(elements.total.avg_time_on_page)
    ]

    const bounceRateList = [
      elements.today.bounce_rate,
      elements.yesterday.bounce_rate,
      elements.total.bounce_rate
    ]

    for (let i = 0; i < 3; i++) {
      content[i] = {
        spanList: spanList[i],
        titleList: titleList[i],
        pvList: pvList[i],
        uvList: uvList[i],
        forwardingList: forwardingList[i],
        avgTimeList: avgTimeList[i],
        bounceRateList: bounceRateList[i]
      }
    }
    return (
      <Card title='基本信息'>
        <Row align='bottom'>
          <Col span={5} offset={1}>
            <br />
            <div className='titleGroup'>
              <p>浏览量</p>
              <p>访客数</p>
              <p>转发数</p>
              {/* <p>平均时长</p>
              <p>跳出率</p> */}
            </div>
          </Col>
          {content.map((e, i) => {
            return (
              <Col span={e.spanList} key={i}>
                <p>{e.titleList}</p>
                <p>{e.pvList}</p>
                <p>{e.uvList}</p>
                <p>{e.forwardingList}</p>
                {/* <p>{e.avgTimeList}</p>
                <p>{e.bounceRateList}</p> */}
              </Col>
            )
          })}
        </Row>
      </Card>
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

export default SummaryMobile
