import { createContext } from "react";

type User = {
  token: string;
  username: string;
  avatar: string;
};

type ACTION_TYPE =
  | { type: "login"; data: User }
  | { type: "logout" }
  | { type: "flashMessages"; value: string };

const DispatchContext = createContext<React.Dispatch<ACTION_TYPE>>(
  {} as React.Dispatch<ACTION_TYPE>
);

export { DispatchContext };
