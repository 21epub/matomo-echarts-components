import React from 'react'
import { AppProvider } from '@21epub/matomo-echarts-components'
// import Example from './Example'
import TestOptions from './TestOptions'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <AppProvider>
      {/* <Example /> */}
      <TestOptions />
    </AppProvider>
  )
}

export default App
