import React, { useReducer } from "react";
import PropTypes from "prop-types";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //actions === { addBlogPost: dispatch => return () => {}}
    const boundActions = {};
    Object.keys(actions).forEach(key => {
      boundActions[key] = actions[key](dispatch);
    });

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
