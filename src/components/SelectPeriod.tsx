import React,{useContext} from 'react';
import { DatePicker } from 'antd'
import moment from 'moment';
import { AppContext } from './context';
import { checkPeriod } from './dateCompute';
//import styles from './index.module.less';

function SelectPeriod() {
    const { state: globalProps,dispatch} = useContext(AppContext);
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
 
    const selectPeriod = (data:any,dateString:string[]) => {
        const period = checkPeriod(globalProps._dateRange[0],globalProps._dateRange[1])
        const newSate ={
            _dateRange:[dateString[0],dateString[1]],
            options:period
        }
        dispatch({
            type: 'selectPeriod',
            payload: newSate
        })
    };

    return(
        //className={styles.selectPeriod}
        <RangePicker  
        format={dateFormat} 
        onChange={selectPeriod}
        value={[moment(globalProps._dateRange[0], dateFormat),moment(globalProps._dateRange[1], dateFormat)]}
        />  
    )
}

export default SelectPeriod;