import { createContext } from "react";

type InitialState = {
  loggedIn: boolean;
  flashMessages: string[];
};

const StateContext = createContext<InitialState>({} as InitialState);

export { StateContext };
