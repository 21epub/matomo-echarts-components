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

function Trend({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/trend', fetcher);

    const { state: globalProps} = useContext(AppContext);
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];

    if(elements){
        const keylist = Object.keys(elements);
        let elements_nb_hits = []
        let i = 0;
        for(;i<keylist.length;i++){
            elements_nb_hits[i]={'date':keylist[i],'nb_hits':elements[keylist[i]].nb_hits};
        }
        const nb_hits = elements_nb_hits;
        const labelList =['date','nb_hits']

        let content = {
            tooltip: {},
            dataset: {
                dimensions: labelList,
                source: nb_hits,
            },
            xAxis: {type: 'category'},
            yAxis: {type: 'value'},
            series: [
                {
                    type: 'line', 
                    smooth: true, 
                    seriesLayoutBy: 'row'
                }
            ]
        };

        return(
            <Card title="趋势图" extra={<Space size={'large'}><p>{startDate}-{endDate}</p><a href="#"><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Trend;