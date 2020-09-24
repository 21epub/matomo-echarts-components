import React from 'react'
import { Barchart} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'

const App = () => {
  return (
    <div>
    {/* <ExampleComponent text="Create React Library Example 😄" /> */}
    <Barchart url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'/>
    </div>
    )
}

export default App
