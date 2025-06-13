import React, { createContext, useContext, useReducer } from "react";
import { AppReducer, initialstate } from "./AppReducer";

const GlobalContext = createContext();

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialstate);

  return (
    <GlobalContext.Provider
      value={{ user: state.user, basket: state.basket, dispatch: dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default ContextProvider;

export const ContextConsumer = () => {
  return useContext(GlobalContext);
};
