import { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({children}) => {
    const [state, setState] = useState("Initial");
    return <DataContext.Provider value={{
        state, setState
    }}>{children}</DataContext.Provider>;
}

export const useStateContext = () => useContext(DataContext);