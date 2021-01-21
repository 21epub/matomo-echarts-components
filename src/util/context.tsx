import React, { createContext, useReducer } from 'react'
import reducers from './reducers'
import { getThisYear, keyToRange } from './dateCompute'

const date = keyToRange('last30')

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  org?: string
  year?: string
}

// all为作品成效，total为机构+首页；all只传startTime,即作品create_time；total与range的逻辑一样，只是不展示
const options = {
  dateRange: date,
  period:
    'thisyear' ||
    'all' ||
    'today' ||
    'yesterday' ||
    'last7' ||
    'last15' ||
    'last30' ||
    'range' ||
    'last365' ||
    'total',
  source:
    'allSource' || 'direct' || 'search' || 'website' || 'social' || 'campaign',
  selection: 'day' || 'month' || 'year',
  org: 'branch' || 'total',
  year: getThisYear()
}
const AppContext = createContext<{
  state: Options
  dispatch: React.Dispatch<any>
}>({
  state: options,
  dispatch: () => null
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, options)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
