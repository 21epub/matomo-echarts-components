import React, { createContext, useReducer } from 'react'
import reducers from './reducers'
import { keyToRange } from './dateCompute'

const date = keyToRange('last30')

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  org?: string
}

const options = {
  dateRange: date,
  period:
    'last30' ||
    'all' ||
    'today' ||
    'yesterday' ||
    'last7' ||
    'last15' ||
    'range' ||
    'last365',
  source:
    'allSource' || 'direct' || 'search' || 'website' || 'social' || 'campaign',
  selection: 'day' || 'month' || 'year',
  org: 'branch' || 'total'
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
