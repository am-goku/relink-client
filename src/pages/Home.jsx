import React from 'react'
import NavBar from '../components/layout/NavBar'
import SinglePost from '../components/singlePost/SinglePost'
import PostContainer from '../components/containers/PostContainer';
import SuggestionContainer from '../components/containers/SuggestionContainer';
import Suggestion from '../components/profiles/Suggestion';
import NavBarSm from '../components/layout/NavBar-Sm';
import Header from '../components/layout/Header';
import CreatePost from '../components/modal/CreatePost';

function Home() {

  return (
    <>

    <CreatePost />
    </>
  );
}

export default Home