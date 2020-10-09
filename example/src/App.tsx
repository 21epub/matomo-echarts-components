import React from 'react'
//import {Summary,Promote, Trend,AppProvider,Filter} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css';
import TestOptions from './TestOptions'
//import { AppProvider } from '../';
import {AppProvider} from '@21epub/matomo-echarts-components'

const App = () => {
  return (
    <div>
    {/* <ExampleComponent text="Create React Library Example 😄" /> */}
    <AppProvider>
    <TestOptions/>
    </AppProvider>
    {/* </AppProvider> */}
    {/* <AppProvider>
    <Summary url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/summary/'/>
    <Filter/>
    <SelectPeriod/>
    <Promote url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'/>
    <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/'/>
    <Detail url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'/>
    </AppProvider> */}
    </div>
    )
}

export default App
