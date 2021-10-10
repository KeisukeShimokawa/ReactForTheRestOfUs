import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type ProfileParams = {
  username: string;
};

type PostResponseType = {
  _id: string;
  title: string;
  createdDate: Date;
  author: { avatar: string };
};

const ProfilePost = () => {
  const { username } = useParams<ProfileParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostResponseType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was an error.");
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img
              className="avatar-tiny"
              src={post.author.avatar}
              alt="avatar group"
            />{" "}
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">on {dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
};

export { ProfilePost };
