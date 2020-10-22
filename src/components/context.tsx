import React, { createContext, useReducer } from 'react'
import reducers from './reducers'

type Options = {
  dateRange: string[]
  period: string
}
const options = {
  dateRange: [],
  period:
    'all' ||
    'today' ||
    'yesterday' ||
    'last7' ||
    'last15' ||
    'last30' ||
    'range'
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
