import React, { createContext, useReducer } from 'react';
import reducers from './reducers';

type IGlobalProps = {
    _dateRange: string[],
    options:string
}

const globalProps={
  _dateRange:['2020/01/01','2020/01/01'],
  options:'all'||'today'||'yesterday'||'last7'||'last15'||'last30'||'range'
}

const AppContext = createContext<{
  state: IGlobalProps;
  dispatch: React.Dispatch<any>;
}>({
  state: globalProps,
  dispatch: () => null
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, globalProps);
  
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };