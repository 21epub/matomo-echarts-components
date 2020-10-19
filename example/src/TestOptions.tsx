import React,{useContext} from 'react'
import {AppContext,Filter,Trend,EchartsMap,Detail,Barchart,Promote} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
//import 'antd/dist/antd.css';
import { Col, Row } from 'antd';


const TestOptions = () => {
  const { state: options} = useContext(AppContext);
  const detailLink:string = "#";
  // const mapTitle:string = '地域分布';
  const barchartTitle:string = "扩展渠道";
  // const promoteTitle:string = "推广分析";
  const trendTitle:string = "趋势图";


  return (
    <div>   

<Row gutter={[16, 16]}>
          <Col span={24}>
            <EchartsMap
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/"
              options={options}
              detailType="map"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Barchart
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Promote
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/"
              options={options}
              detailLink={detailLink}
              cardTitle={barchartTitle}
              isDetailVersion
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/"
              options={options}
              detailType="promote"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/"
              options={options}
              detailType="barchart"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Filter/>  
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} cardTitle={trendTitle} isDetailVersion={true}/> 
          </Col>
        </Row>
 

    </div>
    )
}

export default TestOptions
