import Axios from "axios";
import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { DispatchContext } from "../DispatchContext";
import { StateContext } from "../StateContext";
import { Page } from "./Page";

type CreatePostProps = {
  // addFlashMessages: (msg: string) => void;
  history: { push: (path: string) => void };
};

const CreatePost = ({ history }: CreatePostProps) => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:8080/create-post", {
        title,
        body,
        token: appState.user.token
      });
      appDispatch({
        type: "flashMessages",
        value: "Congrats, you sucessfully created post."
      });
      // Redirect to new post url
      history.push(`/post/${response.data}`);
      console.log("new post was created");
    } catch (e) {
      console.log("there was an error");
    }
  };

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default withRouter(CreatePost);
