import React,{useContext} from 'react';
import {AppContext} from './context';
import SelectPeriod from './SelectPeriod';
import { Tabs} from 'antd';
const { TabPane } = Tabs;

function Filter() {
    const { state: globalProps} = useContext(AppContext);
    const startDate = globalProps._dateRange[0];
    const endDate = globalProps._dateRange[1];
    // var now = '2017-12-12 00:00:00';
    // var moment = moment(now,'YYYY-MM-DD HH:mm:ss');
    if(startDate===endDate){
        console.log('是同一天')
    }else{
        console.log('不是同一天')
    }
    

    return(
        <Tabs defaultActiveKey="today" tabBarExtraContent={<SelectPeriod/>}>
            <TabPane tab="今日" key="today">          
            </TabPane>
            <TabPane tab="昨日" key="yesterday">          
            </TabPane>
            <TabPane tab="近7日" key="last7">        
            </TabPane>
            <TabPane tab="近15日" key="last15">        
            </TabPane>
            <TabPane tab="近30日" key="last30">        
            </TabPane>
            <TabPane tab="全部" key="all">        
            </TabPane>
        </Tabs>
    )
}

export default Filter;