import React,{useContext} from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd';
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';
import { AppContext } from './context';

interface Props {
    url: string,
    options?:string 
}

function Promote({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/promote', fetcher);

    const { state: globalProps} = useContext(AppContext);
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];

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
                    itemStyle:{
                        normal:{
                            label: {
                                show : true,
                                formatter: '{b} {d}%'
                            }
                        },
                    }
                },
            ],
            color:[ 
                'rgb(124,161,245)',
                'rgb(143,221,184)',
                'rgb(122,134,161)',
                'rgb(240,200,85)',
                'rgb(223,131,108)'        
            ]
        };

        return(
            <Card title="推广分析" extra={<Space size={'large'}><p>{startDate}-{endDate}</p><a href="#"><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Promote;