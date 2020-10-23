import React, { useState } from 'react'
import { Card,Row, Col,Select,Radio,Dropdown,Menu} from 'antd'
import ReactEcharts from 'echarts-for-react'
const { Option } = Select
import styles from './index.module.less'
import { DownOutlined } from '@ant-design/icons'



function TransformTrend(){
    const menuValue:string[] = ['转化次数、转化率','测试测试测试','测试2']
    const [menuIndex,setMenuIndex] = useState(0)

    function handleMenuClick(e:any) {
      setMenuIndex(e.key)
    }
    
    const menu = (
      <Menu onClick={handleMenuClick}>
        {   
            menuValue.map((el, i) => {
                return (
                  <Menu.Item key={i} >
                  {el}
                  </Menu.Item>
                )
            })
        }
      </Menu>
    );

    const content = {
        tooltip: {
          formatter: function (params: any) {
              console.log(params)
            const date = params.data.date
            const key = params.dimensionNames[1]
            const value = params.data[key]
            return key + '<br/>' + date + ':  ' + value
          }
        },
        legend: {
            bottom:'bottom',
            icon: 'circle'
        },
        dataset: {
            source: [
                ['date', 'p1', 'p2'],
                [0, 210, 58],
                [3, 320, 89],
                [6, 510, 18],
                [9, 780, 120],
                [12, 440,100],
                [15, 280, 60],
                [18, 370, 89],
                [21, 310, 68]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: [
            { 
                type: 'value',                                    
                axisLine: {show:false},
                axisTick: {show:false}, 
                splitNumber: 5,
                max:780,
                interval:780/5
            },
            { 
                type: 'value' ,
                axisLine: {show:false},
                axisTick: {show:false}, 
                splitNumber: 5,
                max:120,
                interval:120/5,
                axisLabel: {  
                    show: true,  
                    interval: 'auto',  
                    formatter: '{value}%'  
                }, 
            }
        ],
        series: [
          {
            name:'转化次数',
            type: 'line',
            symbol:'circle',
            symbolSize:5, 
            itemStyle: {
              normal: {
                color: '#63ade4',
              }
            }
          },
          {
            name:'转化率',
            type: 'line',
            yAxisIndex: 1,
            symbol:'circle',
            symbolSize:5,
            itemStyle: {
              normal: {
                color: '#8bcb56',
              }
            }
          }
        ]
    }

    let cardConent = []
    const titleList = ['访问次数','访客数（UV）','转化次数','转化率']
    const todayData = [234,129,28,'32%']
    for (let i = 0; i < titleList.length; i++) {
        cardConent[i] = {
          titleList: titleList[i],
          dataList: todayData[i],
        }
    }
    
    const handleOnChange=(e:any)=>{
      console.log(e.target.value)
    }

    return(
        <div className={styles.transformTrend}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title='转化目标'
              extra={
                <div className='transformSelecter'>
                <Select defaultValue='all' style={{ width: 250 }}>
                <Option value='all'>跳转手机银行APP</Option>
                <Option value='Option1'>Option1</Option>
                </Select>
                </div>
              }
            >
              <Card.Grid style={{width: '100%',}} hoverable={false}>
                  <Row>
                  {   
                      cardConent.map((e, i) => {
                          return (
                              <Col span={4} offset={2} key={i}>
                                  <p>{e.titleList}</p>
                                  <h1>{e.dataList}</h1>
                              </Col>
                          )
                      })
                  }
                  </Row>
              </Card.Grid>
              <Card.Grid style={{width: '100%',}} hoverable={false}>
                <Row align='stretch'>
                  <Col span={4}>
                    <Dropdown.Button overlay={menu} placement="bottomRight" icon={<DownOutlined style={{ fontSize: '10px', color: 'grey' }}/>} size='small'> 
                    <div style={{width: '160px' , border: '1px' }}>
                        <div style={{width: '15px',float: 'left',color:'grey'}}>指标：</div>
                        <div style={{width: '135px',float: 'right'}}>{menuValue[menuIndex]}</div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    </Dropdown.Button>
                  </Col> 
                  <Col span={6} offset={14} style={{left:'40px'}}>
                    <Radio.Group defaultValue='day' size='small' buttonStyle="solid" onChange={handleOnChange} >
                      <Radio.Button value="time">按时</Radio.Button>
                      <Radio.Button value="day">按日</Radio.Button>
                      <Radio.Button value="week" disabled>按周</Radio.Button>
                      <Radio.Button value="month" disabled>按月</Radio.Button>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <ReactEcharts option={content} />
                  </Col>
                </Row>
              </Card.Grid> 
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default TransformTrend