import React from"react";
import useSWR from 'swr';
import {Card, Spin} from 'antd'
import ReactEcharts from 'echarts-for-react';
import 'antd/dist/antd.css';

interface Props {
    url: string,
    period?:string 
}

function Barchart({ url }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/barchat', fetcher);

    if(elements){
        const keylist = Object.keys(elements[0]);

        let content = {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: keylist,
                source: elements
            },
            xAxis: {type: 'category'},
            yAxis: {type: 'value'},
            series: [
                {type: 'bar'}
            ]
        };

        return(
            <div>
                <h1>扩展渠道</h1>
                <Card>
                    <ReactEcharts option={content}/>
                </Card>
            </div>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Barchart;