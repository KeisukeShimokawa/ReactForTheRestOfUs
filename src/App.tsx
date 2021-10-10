import { useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

// My Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { HomeGuest } from "./components/HomeGuest";
import { About } from "./components/About";
import { Terms } from "./components/Terms";
import CreatePost from "./components/CreatePost";
import { ViewSinglePost } from "./components/ViewSinglePost";
import { FlashMessages } from "./components/FlashMessages";
import { StateContext } from "./StateContext";
import { DispatchContext } from "./DispatchContext";

type STATE_TYPE = {
  loggedIn: boolean;
  flashMessages: string[];
};

type ACTION_TYPE =
  | { type: "login" }
  | { type: "logout" }
  | { type: "flashMessages"; value: string };

export default function App() {
  const initialState: STATE_TYPE = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: []
  };

  const ourReducer = (draft: typeof initialState, action: ACTION_TYPE) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessages":
        draft.flashMessages.push(action.value);
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/about-us" exact>
              <About />
            </Route>
            <Route path="/terms" exact>
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
