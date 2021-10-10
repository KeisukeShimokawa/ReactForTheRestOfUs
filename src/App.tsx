import { createContext, useState } from "react";
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
import { ExampleContext } from "./components/ExampleContext";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexAppToken"))
  );

  const [flashMessages, setFlashMessages] = useState<string[]>([]);

  const addFlashMessages = (msg: string) => {
    setFlashMessages((prev) => prev.concat(msg));
  };

  return (
    <ExampleContext.Provider value={{ addFlashMessages, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
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
    </ExampleContext.Provider>
  );
}
