import React from 'react';
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
//import {AppContext} from './context';
import ReactEcharts from 'echarts-for-react';
import styles from './index.module.less';

type Options = {
    dateRange:string[],
    period:string,
}

interface Props {
    url: string,
    options: Options,
    detailLink:string,
    cardTitle:string,
    isShowDetailLink?:boolean
}

function Barchart({ url,options,detailLink,cardTitle,isShowDetailLink=true}: Props) {
    // //兼容性
    // const params = new URLSearchParams();
    // params.set('option', option);      
    // params.set('startDate', startDate);     
    // params.set('endDate', endDate);  
    // console.log('newurl:',params.toString());

    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];
    const period = options.period;
    console.log('barchart',startDate,endDate,period)

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
            <Card title={cardTitle} extra={<Space size={'large'}><p className={styles.daterange}>{startDate}-{endDate}</p><a href={detailLink} style={{display:isShowDetailLink?"block":"none"}}><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Barchart;