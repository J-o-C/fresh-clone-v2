import { createContext, useEffect, useState, useReducer } from 'react';

import axios from 'axios';

export const FiltersContext = createContext();

const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, filters: action.payload };
    case 'UPDATE-SELECTED':
      return { ...state, selected: action.payload };
    default:
      return { ...state };
  }
};

export function FiltersContextProvider({ children }) {
  const [state, dispatch] = useReducer(filtersReducer, {
    filters: null,
    selected: {
      agents: [],
      group: [],
      status: ['Open'],
      priority: [],
      type: [],
      contacts: [],
    },
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      const response = await axios.get('api/filters/get-filters');

      dispatch({ type: 'UPDATE', payload: response.data });
      setLoaded(true);
    };

    const filters = JSON.parse(localStorage.getItem('filters'));

    if (filters) {
      dispatch({ type: 'UPDATE-SELECTED', payload: filters });
    }

    try {
      fetchFilters();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <FiltersContext.Provider value={{ state, loaded, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}
