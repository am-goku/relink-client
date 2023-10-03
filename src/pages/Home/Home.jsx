import React from "react";
import NavBar from "../../components/layout/NavBar";
import SinglePost from "../../components/singlePost/SinglePost";
import PostContainer from "../../components/containers/PostContainer";
import SuggestionContainer from "../../components/containers/SuggestionContainer";
import Suggestion from "../../components/profiles/Suggestion";
import Header from "../../components/layout/Header";
import NavBarSm from "../../components/layout/NavBar-Sm";

function Home() {
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
