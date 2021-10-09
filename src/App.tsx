import { useState } from "react";
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

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("complexAppToken"))
  );

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
  );
}
