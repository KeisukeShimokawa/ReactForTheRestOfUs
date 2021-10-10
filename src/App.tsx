import { useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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

type ACTION_TYPE =
  | { type: "login" }
  | { type: "logout" }
  | { type: "flashMessages"; value: string };

export default function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: []
  };

  const ourReducer = (state: typeof initialState, action: ACTION_TYPE) => {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages };
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages };
      case "flashMessages":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages };
    }
  };

  const [state, dispatch] = useReducer(ourReducer, initialState);

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
