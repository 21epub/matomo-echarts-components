import React,{useState} from"react";
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
    isDetailVersion?:boolean,
    create_time:string
}

function Trend({ url,options,detailLink,cardTitle,isDetailVersion=false,create_time}: Props) {
    const bigVersion = styles.bigTrendVersion;
    const smallVersion = styles.smallTrendVersion;

    const period = options.period;
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];

    let daterangeContent =`${startDate}-${endDate}`
    if(period==='all'){
         daterangeContent = '';
    }

    let newUrl = ''       
    if(period!=='all' && startDate && endDate){
        newUrl = `${url}?period=${period}&start_time=${startDate.replace(/\//g,"-")}&end_time=${endDate.replace(/\//g,"-")}`
    }else {
        newUrl = `${url}?period=${period}&start_time=${create_time.replace(/\//g,"-")}`
    }

    const swrOptions ={
        refreshInterval: 0 
    }
    const fetcher = (url:string) => fetch(url).then(r => r.json())
    const { data: elements } = useSWR(newUrl, fetcher, swrOptions);

    const [keyState,setKeyState] =useState("nb_hits");

    function getKey(key:string){
        setKeyState(key);
    }

    if(elements&&elements.length!==0){
        const keylist = Object.keys(elements);
        let elements_value = [];        
        for(let i = 0;i<keylist.length;i++){
            if(keyState==='bounce_rate'){
                let value = elements[keylist[i]][keyState];
                value = Number(value.substr(0,value.length - 1))
                elements_value[i]={'date':keylist[i],[keyState]:value};
            }else{
                elements_value[i]={'date':keylist[i],[keyState]:elements[keylist[i]][keyState]};
            }        
        }
        const sourceValue = elements_value;
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
                            <TrendDetail url={url} options={options} keyState={keyState} create_time={create_time}/>
                        </Col>
                    </Row>
                </div>
            )
        }else if(elements&&elements.length===0){
            return(
                <div className={isDetailVersion?bigVersion:smallVersion}>
                <Card title={cardTitle} extra={<Space size={'large'}><p className='daterange'>{daterangeContent}</p><a className='detailLink' href={detailLink}><RightOutlined/></a></Space>}>
                    <h1>暂无数据</h1>
                </Card>
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