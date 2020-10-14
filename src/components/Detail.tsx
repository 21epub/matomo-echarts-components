import React,{useEffect,useState} from 'react';
import {Table,Card, Button,Space,Spin} from 'antd';
import useSWR from 'swr';
import {DownloadOutlined} from '@ant-design/icons'
import styles from './index.module.less';

type Options = {
    dateRange:string[],
    period:string,
}

interface Props {
    url: string,
    options: Options,
    detailType:string
}

function Detail({ url,options,detailType}: Props) {
    const period = options.period;
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];

    // let defaultUrl = ''       
    // if(period!=='all'){
    //     defaultUrl = `${url}?period=${period}&startDate=${startDate}&endDate=${endDate}`
    // }else{
    //     defaultUrl = `${url}?period=${period}`
    // }
    const swrApi = `/api/${detailType}`
    console.log(swrApi)
    const defaultUrl = url
    const [resultUrl , setResultUrl] = useState(defaultUrl);
    const fetcher = () => fetch(resultUrl).then(r => r.json())
    const { data: elements } = useSWR(swrApi, fetcher);

    //用新URL发送请求
    useEffect(() => {
        let newUrl ='' 
        if(period!=='all'){
            newUrl = `${url}?period=${period}&startDate=${startDate}&endDate=${endDate}`
        }else{
            newUrl = `${url}?period=${period}`
        }
        
        console.log(`${detailType}Detail`,newUrl);      
        setResultUrl(newUrl)
    }, [options]); 

    let daterangeContent =`${startDate}-${endDate}`
    if(period==='all'){
         daterangeContent = '';
    }

    if(elements){
        const keylist = Object.keys(elements[0]);
        let columns = []
        for(let i = 0;i<keylist.length;i++){
            columns[i] = {title:keylist[i],dataIndex:keylist[i]}
        }

        let data = []
        for(let i = 0;i<elements.length;i++){
            Object.defineProperty(elements[i], 'key', {value:i})
            data[i] = elements[i];        
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

export default Detail;