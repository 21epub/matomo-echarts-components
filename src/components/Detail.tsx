import React from 'react';
import {Table,Card, Button,Space,Spin} from 'antd';
import useSWR from 'swr';
import {DownloadOutlined} from '@ant-design/icons'
import styles from './index.module.less';

interface Props {
    url: string,
    options?:any
}

//这个数据处理有问题
function Detail({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/barchat', fetcher);

    const period = options.period;
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];

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
            data[i] = { 
                key: i,
                [keylist[0]]: elements[i][keylist[0]],
                [keylist[1]]: elements[i][keylist[1]],
                //[keylist[1]]: elements[i][keylist[1]],
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

export default Detail;