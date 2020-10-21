import React,{useContext} from 'react'
import {AppContext,Barchart,Detail,EchartsMap,Promote,Trend} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';


const TestOptions = () => {
  const { state: options} = useContext(AppContext);
  const detailLink:string = "#";
  // const mapTitle:string = '地域分布';
  const barchartTitle:string = "扩展渠道";
  // const promoteTitle:string = "推广分析";
  // const trendTitle:string = "趋势图";
  const create_time = '2020-10-16'


  return (
    <div>   
        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Summary url="url" create_time={create_time}/>
          </Col>
        </Row> */}

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Barchart
              // url="url" 
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
              create_time ={create_time}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              // url="url" 
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              create_time ={create_time}
              detailType='promote'
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <EchartsMap
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/map/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
              create_time ={create_time}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Promote
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
              create_time ={create_time}
            />
          </Col>
        </Row>

        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Filter />
          </Col>
        </Row> */}

        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} cardTitle={barchartTitle} isDetailVersion={true} create_time ={create_time}/> 
          </Col>
        </Row> 



        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="url"
              options={options}
              detailType="barchart"
              create_time ={create_time}
            />
          </Col>
        </Row> */}




        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
          <Filter/>  
          </Col>
        </Row> */}

 

    </div>
    )
}

export default TestOptions
