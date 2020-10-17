import React, { useContext, useMemo, useReducer } from 'react';

const ServerDataContext = React.createContext();

export const ServerDataProvider = ({ reducer, initialState, children }) => {
  // const value = useMemo(() => {
  //   return {
  //     data: value
  //   };
  // }, [value]);

  return (
    <ServerDataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ServerDataContext.Provider>
  );
};

export const useServerData = fn => {
  const [context, dispatch] = useContext(ServerDataContext);

  if (!context) {
    throw new Error(
      'useServerData() must be a child of <ServerDataProvider />'
    );
  }

  if (fn) {
    return fn(context, dispatch);
  } else {
    return [context, dispatch];
  }
};
