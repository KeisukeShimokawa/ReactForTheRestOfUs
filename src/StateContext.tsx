import { createContext } from "react";

type User = {
  token: string;
  username: string;
  avatar: string;
};

type STATE_TYPE = {
  loggedIn: boolean;
  flashMessages: string[];
  user: User;
};

const StateContext = createContext<STATE_TYPE>({} as STATE_TYPE);

export { StateContext };
