import React ,{useEffect}from 'react';
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';
import styles from './index.module.less';

type Options = {
    dateRange:string[],
    period:string,
}

interface Props {
    url: string,
    options: Options,
    detailLink?:string,
    cardTitle:string,
    isDetailVersion?:boolean
}

function Barchart({ url,options,detailLink="#",cardTitle,isDetailVersion=false}: Props) {
    const bigVersion = styles.bigVersion;
    const smallVersion = styles.smallVersion;

    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];
    const period = options.period;

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

    // const _url = url;
    // let elements = ''
    //用新URL发送请求
    useEffect(() => {
        //const fetcher = () => fetch(newUrl,{method:'GET'}).then(r => r.json())
        // const fetcher = () => fetch(_url).then(r => r.json())
        // const { data: data } = useSWR('/api/barchat', fetcher);
        // elements = data;
        console.log('barchart',newUrl);
    }, [newUrl]); 

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
            <div className={isDetailVersion?bigVersion:smallVersion}>
            <Card title={cardTitle} extra={<Space size={'large'}><p className='daterange'>{daterangeContent}</p><a className='detailLink' href={detailLink}><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
            </div>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Barchart;