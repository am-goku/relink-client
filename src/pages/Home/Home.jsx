import React from "react";
import NavBar from "../components/layout/NavBar";
import SinglePost from "../components/singlePost/SinglePost";
import PostContainer from "../components/containers/PostContainer";
import SuggestionContainer from "../components/containers/SuggestionContainer";
import Suggestion from "../components/profiles/Suggestion";
import Header from "../../components/layout/Header";
import NavBarSm from "../../components/layout/NavBar-Sm";

function Home() {
  return (
    <>
      <div className="md:hidden pb-10">
        <Header />
      </div>
      <div className="flex">
        <div className="hidden md:block">
          <NavBar />
        </div>
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
      </div>
      <div className="md:hidden mt-14">
        <NavBarSm />
      </div>
    </>
  );
}

export default Home;
