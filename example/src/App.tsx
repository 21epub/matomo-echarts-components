import React from 'react'
import { AppProvider } from '@21epub/matomo-echarts-components'
// import Example from './Example'
import TestOptions from './TestOptions'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

const App = () => {
  return (
    <AppProvider>
      <ConfigProvider locale={zhCN}>
        {/* <Example /> */}
        <TestOptions />
      </ConfigProvider>
    </AppProvider>
  )
}

export default App
