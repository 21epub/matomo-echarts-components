import React from 'react';
import useSWR from 'swr';
import {Card, Spin,Space} from 'antd'
import {RightOutlined} from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react';
import {dataFormat} from './util'
require('echarts/map/js/china.js');

type Options = {
    dateRange:string[],
    period:string
}

type Datatype = {
    name:string,
    value:number,
    rate:number
}

interface Props {
    url: string,
    options: Options,
    detailLink:string,
    cardTitle:string,
    isShowDetailLink?:boolean
}

function EchartsMap({ url,options,detailLink,cardTitle,isShowDetailLink=true}: Props) {
    
    const startDate = options.dateRange[0];
    const endDate = options.dateRange[1];
    const period = options.period;
    console.log('map',startDate,endDate,period)

    //用新URL发送请求
    const _url = url;
    const fetcher = () => fetch(_url).then(r => r.json())
    const { data: elements } = useSWR('/api/map', fetcher);

    if(elements){
        const data = dataFormat(elements);
        var content = {
            title:{
                text: '浏览量',
                x:'left',
                y:'bottom',
                textStyle: {
                    fontWeight: 'normal'
                },
            },
            tooltip: {
                trigger: 'item',
                formatter:function(data:Array<Datatype>) {
                    if(data['data']){
                        return (
                            `${data['name']}<hr/>浏览量: ${data['value']} <br/>占比: ${data['data'].rate}% `
                        )
                    }else{
                        return `${data['name']}`   
                    }
                }       
            },
            visualMap: {
                type:"piecewise", 
                splitNumber: 5,
                //seriesIndex:0,
                pieces: [
                    //{gt: 10000, color: 'RGBA(125, 22, 24, 1.00)'},            // (1500, Infinity]
                    {gt: 1000, lte: 10000, color:  'RGB(69, 132, 220)'},  // (900, 1500]
                    {gt: 100, lte: 1000, color: 'RGB(105, 157, 230)'},  // (310, 1000]
                    {gt: 10, lte: 100, color: 'RGB(162, 190, 234)'},   // (200, 300]
                    {gt: 0, lte: 10 ,color: 'RGB(207, 223, 244)'},   
                    {value: 0, color: '#eef3fd'}
                ],
                realtime: false,
                calculable: false,
                //itemHeight: 50,
                hoverLink: false,
                orient:'horizontal',
                label:{show:false},
                text:['高','低'],
                left:"10%"
            },
            series:
            [
                {
                    name: '浏览量',
                    type: 'map',//type必须声明为 map 说明该图标为echarts 中map类型
                    map: 'china', //这里需要特别注意。如果是中国地图，map值为china，如果为各省市则为中文。这里用北京
                    aspectScale: 0.75, //长宽比. default: 0.75
                    zoom: 1.2,
                    roam: false,
                    // regions: [
                    //     {
                    //         name: "南海诸岛",
                    //         itemStyle: {
                    //         // 隐藏地图
                    //             normal: {
                    //                 opacity: 0, // 为 0 时不绘制该图形
                    //             }
                    //         },
                    //         label: {
                    //         show: false // 隐藏文字
                    //         }
                    //     }
                    // ],             
                    itemStyle:{
                        normal:{
                            //label:{show:true},
                            borderWidth: 1,
                            borderColor: "#fff",
                            areaColor: '#eef3fd',
                        },
                        emphasis:{label:{show:true}}
                    },
                    data: data
                },
            ]
        } 

        return(
            <Card title={cardTitle} extra={<Space size={'large'}><p>{startDate}-{endDate}</p><a href={detailLink} style={{display:isShowDetailLink?"block":"none"}}><RightOutlined/></a></Space>}>
                <ReactEcharts option={content}/>
            </Card>
        )
    }else{
        return <div><Spin/>loading...</div>
    }
}

export default EchartsMap;