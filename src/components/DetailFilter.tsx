import React,{useContext} from 'react';
import {AppContext} from './context';
import SelectPeriod from './SelectPeriod';
import {keyToRange} from './dateCompute';
import styles from './index.module.less';
import { DownOutlined } from '@ant-design/icons';
import { Space, Tabs,Dropdown,Menu,Select} from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

function DetailFilter() {
  const {state:options, dispatch} = useContext(AppContext);

    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
              3rd menu item
            </a>
          </Menu.Item>
        </Menu>
     );

    const filter = (key:string) => {
        const period = key;
        if(key==='all'){
            const newstate = {
                period:period
            }
            dispatch({
                type:'filter',
                payload:newstate
            })
        }else{
            const newRange = keyToRange(key);
            const newSate ={
                dateRange:newRange,
                period:period
            }
            dispatch({
                type: 'filter',
                payload: newSate
            })
        }
    };
    
    return(
        <div className={styles.detailFilter}>
            <Tabs 
            defaultActiveKey={options.period}
            tabBarExtraContent={
            <Space>

            <SelectPeriod/>

            <Select defaultValue="all"  style={{ width: 200 }}>
                <Option value="all">所有来源</Option>
                <Option value="Option1">Option1</Option>
            </Select>

            <Dropdown overlay={menu} placement="bottomRight">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                展开<DownOutlined/>
                </a>
            </Dropdown>

            </Space>
            } 
            onChange={filter}
            >
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
        </div>
    )
}

export default DetailFilter;