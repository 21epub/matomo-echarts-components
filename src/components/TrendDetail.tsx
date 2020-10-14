import React,{useEffect,useState}from 'react';
import {Table,Card, Button,Space,Spin} from 'antd';
import useSWR from 'swr';
import {DownloadOutlined} from '@ant-design/icons'
import styles from './index.module.less';

interface Props {
    url: string,
    options?:any,
    keyState:string
}

function TrendDetail({ url,options,keyState}: Props) {
    const period = options.period;
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];

    let daterangeContent =`${startDate}-${endDate}`
    if(period==='all'){
         daterangeContent = '';
    }
    
    // let defaultUrl = ''       
    // if(period!=='all'){
    //     defaultUrl = `${url}?period=${period}&startDate=${startDate}&endDate=${endDate}`
    // }else{
    //     defaultUrl = `${url}?period=${period}`
    // }
    const defaultUrl = url
    const [resultUrl , setResultUrl] = useState(defaultUrl);
    const fetcher = () => fetch(resultUrl).then(r => r.json())
    const { data: elements } = useSWR('/api/trend', fetcher);

    //用新URL发送请求
    useEffect(() => {
        let newUrl ='' 
        if(period!=='all'){
            newUrl = `${url}?period=${period}&startDate=${startDate}&endDate=${endDate}`
        }else{
            newUrl = `${url}?period=${period}`
        }
        
        console.log('trendDetail',newUrl);      
        setResultUrl(newUrl)
    }, [options]); 

    if(elements){
        const keylist = Object.keys(elements);

        let columns = [];
        columns[0] = {title:'日期',dataIndex:'date'};
        columns[1] = {title:keyState,dataIndex:keyState};

        let data = [];
        for(let i = 0;i<keylist.length;i++){
            data[i] = { 
                'key': [i],
                'date':[keylist[i]],
                [keyState]:elements[keylist[i]][keyState]
            }
        }

        return(
            <div className={styles.trendDetail}>
                <Card title="详细数据列表"  
                extra={
                <Space size={'large'}>
                    <p className='daterange'>{daterangeContent}</p>        
                    <Button icon={<DownloadOutlined/>}>下载数据</Button>
                </Space>}
                > 
                <Table
                columns={columns}
                dataSource={data}
                />
                </Card>
            </div>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default TrendDetail;