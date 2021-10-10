import { Page } from "./Page";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { StateContext } from "../StateContext";
import { ProfilePost } from "./ProfilePost";

type ProfileParams = {
  username: string;
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await Axios.post(`/profile/${username}`, {
          token: appState.user.token
        })) as any;
        setProfileData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log("There was an error.");
      }
    };
  }, []);

  return (
    <Page title="Profile Screen">
      <h2>
        <img
          className="avatar-small"
          src={profileData.profileAvatar}
          alt="small avatar"
        />{" "}
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePost />
    </Page>
  );
};

export { Profile };
