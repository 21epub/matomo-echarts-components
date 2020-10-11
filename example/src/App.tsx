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
    </div>
    )
}

export default App
