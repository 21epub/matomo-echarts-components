# @21epub/matomo-echarts-components

> echarts components for matomo

[![NPM](https://img.shields.io/npm/v/@21epub/matomo-echarts-components.svg)](https://www.npmjs.com/package/@21epub/matomo-echarts-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @21epub/matomo-echarts-components
```

## Example

```tsx
import React from 'react'
import { AppProvider } from '@21epub/matomo-echarts-components'
import Example from './Example'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <AppProvider>
      <Example />
    </AppProvider>
  )
}

export default App
```

## Usage

```tsx
import { AppContext, EchartsMap } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <EchartsMap
      url='url'
      options={options}
      detailLink='#'
      cardTitle='title'
      createTime='2020-10-20'
      isDetailVersion
    />
  )
}

export default Example
```

## License

MIT © [garry](https://github.com/garry)
