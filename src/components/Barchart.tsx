import React,{useContext} from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import {AppContext} from './context';
import ReactEcharts from 'echarts-for-react';

interface Props {
    url: string,
    id:string 
}

function Barchart({ url,id}: Props) {
    const { state: globalProps} = useContext(AppContext);
    const option = globalProps.options;
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];

    //兼容性
    const params = new URLSearchParams();
    params.set('option', option);      
    params.set('startDate', startDate);     
    params.set('endDate', endDate);  
    params.set('id', id);
    console.log('newurl:',params.toString());

    //用新URL发送请求
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
    　　　　　　　　　　barWidth:30
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