import React from"react";
import useSWR from 'swr';
import {Card, Spin} from 'antd'
import ReactEcharts from 'echarts-for-react';
import 'antd/dist/antd.css';

interface Props {
    url: string,
    options?:string 
}

function Promote({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/promote', fetcher);

    if(elements){
        const keylist = Object.keys(elements[0]);
        let content = {
            tooltip: {},
            legend: {
                orient: 'vertical',
                x: 'right',
            },
            dataset: {
                dimensions: keylist,
                source: elements
            },
            xAxis: {type: 'category',show:false},
            yAxis: {type: 'value',show:false},
            series: [
                {
                    type: 'pie',
                    radius:['50%','80%'],
                }
            ]
        };

        return(
            <Card title="推广分析">
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Promote;