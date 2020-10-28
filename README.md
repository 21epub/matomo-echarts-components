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

<br>
####*Summary*
```tsx
import { AppContext, Summary } from '@21epub/matomo-echarts-components'

const Example = () => {

return (
<Summary
      url='url'
      createTime='2020-10-20'
    />
)
}

export default Example

````
* **url** *: string* - data url;
* **createTime** *: string* - creation time of the item;

<br>

####*Filter&DetailFilter&TrendDetailFilter*

```tsx
import { AppContext,Filter,DetailFilter,TrendDetailFilter} from '@21epub/matomo-echarts-components'

const Example = () => {

  return (
    <div>
        <Filter/>
        <DetailFilter/>
        <TrendDetailFilter/>
    </div>
  )
}

export default Example
````

- **Filter**: When user changes the options, Filter will change the options state and make other components contain the same state.
- **DetailFilter**: Same as _Filter_ but used in some detail page without source option.
- **TrendDetailFilter**: Like _Filter_ and _DetailFilter_,but contains more option button which can select the data source.

####_EchartsMap_

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

- **url** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **detailLink?** _: string_ - set the detail link;the default value is '#';
- **cardTitle** _: string_ - set the card title;
- **createTime** _: string_ - creation time of the item;
- **isDetailVersion?** _: boolean_ - set the component version;if it is detail version,it will set another style;the default value is false;
  <br>

####_Barchart_

```tsx
import { AppContext, Barchart } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <Barchart
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

- **url** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **detailLink?** _: string_ - set the detail link;the default value is '#';
- **cardTitle** _: string_ - set the card title;
- **createTime** _: string_ - creation time of the item;
- **isDetailVersion?** _: boolean_ - set the component version;if it is detail version,it will set another style;the default value is false;
  <br>

####_Promote_

```tsx
import { AppContext, Promote } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <Promote
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

- **url** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **detailLink?** _: string_ - set the detail link;the default value is '#';
- **cardTitle** _: string_ - set the card title;
- **createTime** _: string_ - creation time of the item;
- **isDetailVersion?** _: boolean_ - set the component version;if it is detail version,it will set another style;the default value is false;
  <br>

####_Trend_

```tsx
import { AppContext, Trend } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <Trend
      url='url'
      options={options}
      detailLink='#'
      cardTitle='title'
      createTime='2020-10-20'
      isDetailVersion
      extra={[]}
    />
  )
}

export default Example
```

- **url** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **detailLink?** _: string_ - set the detail link;the default value is '#';
- **cardTitle** _: string_ - set the card title;
- **createTime** _: string_ - creation time of the item;
- **isDetailVersion?** _: boolean_ - set the component version;if it is detail version,it will set another style;the default value is false;
- **extra?** _: React.ReactNode[ ]_ - set the extra content;
  <br>

####_TransformTrend_

```tsx
import { AppContext, TransformTrend } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <TransformTrend
      optionsUrl='url'
      summaryUrl='url'
      options={options}
      createTime='2020-10-20'
      extra={[]}
    />
  )
}

export default Example
```

- **optionsUrl** _: string_ - url to get options;
- **summaryUrl** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **createTime** _: string_ - creation time of the item;
- **extra?** _: React.ReactNode[ ]_ - set the extra content;
  <br>

####_Detail_

```tsx
import { AppContext, Detail } from '@21epub/matomo-echarts-components'

const Example = () => {
  const { state: options } = useContext(AppContext)

  return (
    <Detail
      url='url'
      options={options}
      createTime='2020-10-20'
      detailType='barchart'
      extra={[]}
    />
  )
}

export default Example
```

- **url** _: string_ - data url;
- **options** _: Options_ - user's option,get from AppContext component;
- **detailType** _: string_ - set the type of detail data;can only set to **'map'**,**'promote'**,**'barchart'**;
- **createTime** _: string_ - creation time of the item;
- **extra?** _: React.ReactNode[ ]_ - set the extra content;

## License

MIT © [garry](https://github.com/garry)
