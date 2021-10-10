import { useContext, useState } from "react";
import Axios from "axios";
import { ExampleContext } from "./ExampleContext";

const HeaderLoggedOut = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const ctx = useContext(ExampleContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = (await Axios.post("https://localhost:8080/login", {
        username,
        password
      })) as any;
      if (response.data) {
        console.log(response.data);

        localStorage.setItem("complexAppToken", response.data.token);
        localStorage.setItem("complexAppUsername", response.data.username);
        localStorage.setItem("complexAppAvatar", response.data.avatar);

        ctx?.setLoggedIn(true);
      } else {
        console.log("incorrect username / password");
      }
    } catch (e) {
      console.log("there was an error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export { HeaderLoggedOut };
