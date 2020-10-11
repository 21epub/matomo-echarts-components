import React,{useEffect} from"react";
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd';
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';
import styles from './index.module.less';

type Options = {
    dateRange:string[],
    period:string
}

interface Props {
    url: string,
    options: Options,
    detailLink?:string,
    cardTitle:string,
    isDetailVersion?:boolean
}

function Promote({ url,options,detailLink="#",cardTitle,isDetailVersion=false}: Props) {
    const bigVersion = styles.bigVersion;
    const smallVersion = styles.smallVersion;

    const period = options.period; 
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];
    let daterangeContent =`${startDate}-${endDate}`
    if(period==='all'){
         daterangeContent = '';
    }

    let newUrl =''
    if(period!=='all'){
        newUrl = `${url}?period=${period}&startDate=${startDate}&endDate=${endDate}`
    }else{
        newUrl = `${url}?period=${period}`
    }

    useEffect(() => {
        console.log('promote',newUrl);
    }, [newUrl]); 

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
            <div className={isDetailVersion?bigVersion:smallVersion}>
                <Card title={cardTitle} extra={<Space size={'large'}><p className='daterange'>{daterangeContent}</p><a href={detailLink} className='detailLink'><RightOutlined/></a></Space>}>
                    <ReactEcharts option={content}/>
                </Card>
            </div>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Promote;