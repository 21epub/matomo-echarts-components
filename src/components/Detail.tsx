import React,{useContext} from 'react';
import {Table,Card, Button,Space,Spin} from 'antd';
import useSWR from 'swr';
import {DownloadOutlined} from '@ant-design/icons'
import {AppContext} from './context';

interface Props {
    url: string,
    options?:string 
}

//这个数据处理有问题
function Detail({ url,options }: Props) {
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/barchat', fetcher);

    const { state: globalProps} = useContext(AppContext);
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];

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
            }
        }

        return(
            <Card title="详细数据列表"  
            extra={
            <Space size={'large'}>
                <p>{startDate}-{endDate}</p>        
                <Button type="primary" icon={<DownloadOutlined/>}>下载数据</Button>
            </Space>}
            > 
            <Table
            columns={columns}
            dataSource={data}
            />
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default Detail;