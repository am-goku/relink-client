import React, { useState } from "react";
import ProfileCard from "../components/profiles/ProfileCard";
import UserPosts from "../components/profiles/UserPosts";
import EditPost from "../components/modal/EditPost";
import GoogleSignInButton from "../components/Oauth/OauthSignin";

function Test2() {
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="w-full h-screen flex overflow-scroll no-scrollbar justify-center items-center">
        <GoogleSignInButton />
      </div>
    </>
  );
}

export default Test2;
