import React from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  // const user = useSelector((state)=> state?.user.userData);
  const isValid = useSelector((state)=> state?.user?.validUser);

  if(!isValid) {
    navigate("/login");
  }

  return (
    <>
        <div className="ml-auto">
          <PostContainer>
            <SinglePost />
            <SinglePost />
            <SinglePost />
          </PostContainer>
        </div>

        <div className="hidden lg:block md:hidden mr-auto ml-auto">
          <SuggestionContainer>
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
          </SuggestionContainer>
        </div>
    </>
  );
}

export default Home;
