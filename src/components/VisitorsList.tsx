import React, { useState } from 'react'
import { Card, Col, Pagination, Row, Space, Spin } from 'antd'
import useSWR from 'swr'
import { clone } from 'ramda'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  extra?: React.ReactNode[]
  pre?: string
}

function VisitorsList({ url, options, extra, pre }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const pageIni = {
    current: 1,
    pageSize: 50
  }
  const [page, setPage] = useState(pageIni)

  let newUrl = ''
  if (period !== 'all' && startDate && endDate) {
    newUrl = `${url}?page=${page.current}&size=${
      page.pageSize
    }&period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  }

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  const swrOptions = {
    refreshInterval: 0
  }

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)
  const ele = clone(elements)

  const onShowSizeChange = (current: number, pageSize: number) => {
    console.log('onShowSizeChange', current, pageSize)
    setPage({ current: current, pageSize: pageSize })
  }

  const onChange = (page: any, pageSize: any) => {
    console.log('onChange', page, pageSize)
    setPage({ current: page, pageSize: pageSize })
  }

  function itemRender(current: number, type: string, originalElement: any) {
    if (type === 'prev') {
      return <a>上一页</a>
    }
    if (type === 'next') {
      return <a>下一页</a>
    }
    return originalElement
  }

  if (ele?.length) {
    return (
      <div className={styles.visitorsList}>
        <Card
          title='访客列表'
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <div>{extra}</div>
            </Space>
          }
        >
          {ele.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Row className='visitorInfo'>
                  <Col span={16}>
                    {item.serverDatePrettyFirstAction}
                    {'  '}
                    {item.serverTimePrettyFirstAction}
                  </Col>
                  {item.visitorTypeIcon && (
                    <Col span={2}>
                      <div className='item'>
                        <img
                          src={`${pre}${item.visitorTypeIcon}`}
                          style={{ height: '15px' }}
                          alt='err'
                        />
                        <ul className='itemHover'>
                          <li>
                            {item.visitCount &&
                              `老访客：${item.visitCount}次访问`}
                          </li>
                        </ul>
                      </div>
                    </Col>
                  )}
                  <Col span={2}>
                    <div className='item'>
                      <img
                        src={`${pre}${item.countryFlag}`}
                        style={{ height: '15px' }}
                        alt='err'
                      />
                      <ul className='itemHover'>
                        <li>{item.country && `国家：${item.country}`}</li>
                        <li>{item.region && `地区：${item.region}`}</li>
                        <li>{item.city && `城市：${item.city}`}</li>
                        <li>{item.visitIp && `IP：${item.visitIp}`}</li>
                      </ul>
                    </div>
                  </Col>
                  {/* <Col span={2}>
                    <div className="item">
                      <img src={`${pre}${item.browserIcon}`} 
                      style={{ height: '15px' }}
                      alt="err"
                      />
                      <ul className="itemHover">
                        <li>{item.browser&&`浏览器：${item.browser}`}</li>
                        <li>{item.browserFamily&&`浏览器引擎：${item.browserFamily}`}</li>
                        <li>{item.pluginsIcons?.length&&(
                          <div>
                            插件：
                            {
                              item.pluginsIcons.map((el:any,i:number)=>{
                                return(
                                  <img src={`${pre}${el.pluginIcon}`} 
                                  style={{ height: '15px' }}
                                  alt="err"
                                  key={i}
                                  />
                                )
                              })
                            }
                          </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Col> */}
                  <Col span={2}>
                    <div className='item'>
                      <img
                        src={`${pre}${item.operatingSystemIcon}`}
                        style={{ height: '15px' }}
                        alt='err'
                      />
                      <ul className='itemHover'>
                        <li>
                          {item.operatingSystem &&
                            `操作系统：${item.operatingSystem}`}
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col span={2}>
                    <div className='item'>
                      <img
                        src={`${pre}${item.deviceTypeIcon}`}
                        style={{ height: '15px' }}
                        alt='err'
                      />
                      <ul className='itemHover'>
                        <li>
                          {item.deviceType && `设备类型：${item.deviceType}`}
                        </li>
                        <li>
                          {item.deviceBrand && `设备品牌：${item.deviceBrand}`}
                        </li>
                        <li>
                          {item.deviceModel && `设备型号：${item.deviceModel}`}
                        </li>
                        <li>
                          {item.resolution && `分辨率：${item.resolution}`}
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <Row className='pageInfo'>
                  <Col span={12}>
                    <div className='referrer'>
                      {item.referrerTypeName && item.referrerTypeName}
                    </div>
                  </Col>
                  <Col span={12}>
                    <Row className='analysis'>
                      页面分析:
                      {item.actionDetails &&
                        item.actionDetails.map((el: any, i: number) => {
                          return (
                            <div
                              className='item'
                              key={i}
                              style={{ marginLeft: '5px' }}
                            >
                              <img
                                src={`${pre}${el.iconSVG}`}
                                style={{ height: '15px' }}
                                alt='err'
                              />
                              <ul
                                className='itemHover'
                                style={{ width: '330px' }}
                              >
                                <li>{el.url && el.url}</li>
                                <li>{el.title && el.title}</li>
                                <li>
                                  {el.serverTimePretty && el.serverTimePretty}
                                </li>
                              </ul>
                            </div>
                          )
                        })}
                    </Row>
                  </Col>
                </Row>
              </div>
            )
          })}
          <Pagination
            showSizeChanger
            defaultCurrent={1}
            pageSizeOptions={['10', '20', '50', '100']}
            total={1000}
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            current={page.current}
            className='pagination'
            itemRender={itemRender}
          />
        </Card>
      </div>
    )
  } else if (ele?.length === 0) {
    if (page.current === 1) {
      return (
        <div className={styles.noDataTrendDetail}>
          <Card
            title='访客列表'
            extra={<p className='daterange'>{daterangeContent}</p>}
          >
            <h1>暂无数据</h1>
          </Card>
        </div>
      )
    } else {
      return (
        <div className={styles.noDataVisitors}>
          <Card
            title='访客列表'
            extra={<p className='daterange'>{daterangeContent}</p>}
          >
            <h1>没有更多数据了</h1>
            <Pagination
              showSizeChanger
              defaultCurrent={1}
              pageSizeOptions={['10', '20', '50', '100']}
              total={1000}
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              current={page.current}
              className='paginationEnd'
              itemRender={itemRender}
            />
          </Card>
        </div>
      )
    }
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default VisitorsList
