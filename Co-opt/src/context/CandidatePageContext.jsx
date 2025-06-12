import { createContext } from "react";

export const CandidatePageContext = createContext()

export const CandidatePageContextProvider = (props) => {

    const value = {

    }

    return (<CandidatePageContext.Provider value={value}>
        {props.children}
        </CandidatePageContext.Provider>)

}