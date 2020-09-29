import React,{useContext, useState} from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import {AppContext} from './context';
import ReactEcharts from 'echarts-for-react';
import { Tabs} from 'antd';
const { TabPane } = Tabs;

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
    const [keyState,setKeyState] =useState("nb_hits");

    function getKey(key:string){
        setKeyState(key);
    }

    if(elements){
        const keylist = Object.keys(elements);
        let elements_value = [];
        let i = 0;
        for(;i<keylist.length;i++){
            if(keyState==='bounce_rate'){
                console.log('转换类型',elements[keylist[1]][keyState])
            }else{
                elements_value[i]={'date':keylist[i],[keyState]:elements[keylist[i]][keyState]};
            }        
        }
        const sourceValue = elements_value;
        const labelList =['date',keyState]

        let content = {
            tooltip: {},
            dataset: {
                dimensions: labelList,
                source: sourceValue,
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
                <Tabs defaultActiveKey="nb_hits" activeKey={keyState} onChange={getKey}>
                    <TabPane tab="PV" key="nb_hits">          
                    </TabPane>
                    <TabPane tab="UV" key="nb_uniq_visitors">          
                    </TabPane>
                    <TabPane tab="转发数" key="forwarding_number">        
                    </TabPane>
                    <TabPane tab="平均时长" key="avg_time_on_page">        
                    </TabPane>
                    <TabPane tab="跳出率" key="bounce_rate">        
                    </TabPane>
                </Tabs>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Trend;