import React from 'react';
import { DatePicker } from 'antd'
import moment from 'moment';
import 'antd/dist/antd.css';

// interface Props {
//     startDate?: string,
//     EndDate?:string 
// }

//function SelectPeriod( { startDate,endDate}: Props) {

function SelectPeriod() {
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    let startDate = '2015/01/01';
    let endDate = '2015/01/01';
    // const [startDate,setStartDate] = useState(_startDate);
    // const [endDate,setEndDate] = useState(_endDate);
 
    return(
        <div>
            <RangePicker  
            defaultValue={[moment(startDate, dateFormat),moment(endDate, dateFormat)]} 
            format={dateFormat} 
            onChange={(data,dateString)=>{console.log(dateString)}}
            />
        </div>
    )
}

export default SelectPeriod;