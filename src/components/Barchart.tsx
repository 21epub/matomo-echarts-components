import React,{useContext} from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import {AppContext} from './context';
import ReactEcharts from 'echarts-for-react';

interface Props {
    url: string,
    options?:string 
}

function Barchart({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/barchat', fetcher);

    const { state: globalProps} = useContext(AppContext);
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];

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
            <Card title="扩展渠道" extra={<Space size={'large'}><p>{startDate}-{endDate}</p><a href="#"><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Barchart;