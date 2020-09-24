import React from"react";
import useSWR from 'swr';
import {Card,DatePicker} from 'antd'
import ReactEcharts from 'echarts-for-react';
import 'antd/dist/antd.css';
//import { DatePicker } from 'antd';

const url = "https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/";

const fetcher = () => fetch(url).then(r => r.json())

function Promote() {
    const { data: elements } = useSWR('/api/book', fetcher);
    console.log('ele',elements);

    return (
        // <div>
        //     {/* <p>{JSON.stringify(elements)}</p> */}
        //     <h1>ceshi</h1>
        //     <Card>
        //         <DatePicker/>
        //         <ReactEcharts option={testpic}/>
        //     </Card>
        // </div>
    )
}

export default Promote;