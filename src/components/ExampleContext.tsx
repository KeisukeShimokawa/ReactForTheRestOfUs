import { createContext } from "react";

type ExampleContextProps = {
  addFlashMessages: (msg: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
};

const ExampleContext = createContext<ExampleContextProps | null>(null);

export { ExampleContext };
