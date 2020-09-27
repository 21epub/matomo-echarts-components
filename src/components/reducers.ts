const reducer = (state:any, action:any) => {
    //console.log('action:', action)
    switch (action.type) {
        case 'selectPeriod': {
          const { payload } = action;
          return {...state,...payload};
        } 
        default:
            throw new Error();
    }
  }
  
  export default reducer;