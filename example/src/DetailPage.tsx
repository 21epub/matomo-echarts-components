import React from 'react'
//mport {DetailFilter,Barchart,AppContext} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
// //import 'antd/dist/antd.css';
// import { Col, Row } from 'antd';


const DetailPage = () => {
    // const { state: options} = useContext(AppContext);
    // const barchartTitle:string = "扩展渠道";

    return (
        <div>   
            {/* <Row gutter={[16, 16]}>
            <Col span={24}>
                <DetailFilter/>
            </Col>
            <Col span={24}>
                <Barchart url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/' options={options} cardTitle={barchartTitle}/>
            </Col>
            </Row> */}
        </div>
    )
}

export default DetailPage
