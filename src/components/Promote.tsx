import React from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd';
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';

type Options = {
    dateRange:string[],
    period:string
}

interface Props {
    url: string,
    options: Options,
    detailLink:string,
    cardTitle:string,
    isShowDetailLink?:boolean
}

function Promote({ url,options,detailLink,cardTitle,isShowDetailLink=true}: Props) {
    const option = options.period;
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];
    console.log('promote',option,startDate,endDate)

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
                    itemStyle:{
                        normal:{
                            label: {
                                show : true,
                                formatter: '{b}: {@nb_visits}',//formatter: '{b}:{@nb_visits} {d}%',
                                color:'#000'
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
            <Card title={cardTitle} extra={<Space size={'large'}><p>{startDate}-{endDate}</p><a href={detailLink} style={{display:isShowDetailLink?"block":"none"}}><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Promote;