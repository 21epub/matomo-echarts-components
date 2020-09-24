import React from"react";
import { DatePicker } from 'antd'
import 'antd/dist/antd.css';

function SelectPeriod() {
    const { RangePicker } = DatePicker;

    return(
        <div>
            <RangePicker/>
        </div>
    )
}

export default SelectPeriod;