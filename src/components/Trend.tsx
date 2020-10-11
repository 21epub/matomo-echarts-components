import React,{useState,useEffect} from"react";
import useSWR from 'swr';
import {Card, Spin,Space,Row,Col} from 'antd'
import TrendDetail from './TrendDetail'
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';
import styles from './index.module.less';
import { Tabs} from 'antd';
const { TabPane } = Tabs;

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

function Trend({ url,options,detailLink,cardTitle,isDetailVersion=false}: Props) {
    const bigVersion = styles.bigTrendVersion;
    const smallVersion = styles.smallTrendVersion;

    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/trend', fetcher);

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
        console.log('trend',newUrl);
    }, [newUrl]); 

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
                let value = elements[keylist[i]][keyState];
                value = Number(value.substr(0,value.length - 1))
                elements_value[i]={'date':keylist[i],[keyState]:value};
            }else{
                elements_value[i]={'date':keylist[i],[keyState]:elements[keylist[i]][keyState]};
            }        
        }
        const sourceValue = elements_value;
        //console.log('trend',sourceValue);
        const labelList =['date',keyState];

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
                }
            ]
        };
        const tab =(
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
        )
        
        if(isDetailVersion===true){
            return(
                <div className={isDetailVersion?bigVersion:smallVersion}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={cardTitle} extra={<Space size={'large'}><p className='daterange'>{daterangeContent}</p><a className='detailLink' href={detailLink}><RightOutlined/></a></Space>}>
                                {tab}
                                <ReactEcharts option={content}/>    
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <TrendDetail url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/' options={options}/>
                        </Col>
                    </Row>
                </div>
            )
        }else{
            return(
                <div className={isDetailVersion?bigVersion:smallVersion}>
                    <Card title={cardTitle} extra={<Space size={'large'}><p className='daterange'>{daterangeContent}</p><a className='detailLink' href={detailLink}><RightOutlined/></a></Space>}>
                        {tab}
                        <ReactEcharts option={content}/>    
                    </Card>
                </div>
            )
        }
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Trend;