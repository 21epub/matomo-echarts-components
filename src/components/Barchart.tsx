import React from"react";
import useSWR from 'swr';
import {Card, Spin} from 'antd'
import ReactEcharts from 'echarts-for-react';
import 'antd/dist/antd.css';

interface Props {
    url: string,
    options?:string 
}

function Barchart({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/barchat', fetcher);

    if(elements){
        const keylist = Object.keys(elements[0]);

        let content = {
            tooltip: {},
            dataset: {
                dimensions: keylist,
                source: elements
            },
            xAxis: {type: 'category'},
            yAxis: {type: 'value'},
            series: [
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#7CA1F5',
                            label: {
                                show: true,
                                position: 'top',
                                color:'#000000 '
                            }
                        }
                    },
    　　　　　　　　　　barWidth:50
                }
            ]
        };

        return(
            <Card title="扩展渠道">
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Barchart;