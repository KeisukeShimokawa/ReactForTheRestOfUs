import { createContext } from "react";

type ACTION_TYPE =
  | { type: "login" }
  | { type: "logout" }
  | { type: "flashMessages"; value: string };

const DispatchContext = createContext<React.Dispatch<ACTION_TYPE>>(
  {} as React.Dispatch<ACTION_TYPE>
);

export { DispatchContext };
