import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profiles/ProfileCard";
import UserPosts from "../../components/profiles/UserPosts";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserByUsername, fetchUserPosts } from "../../services/apiMethods";
import EditProfile from "../../components/modal/EditProfile";

function UserProfile() {
  const navigate = useNavigate();

  const { validUser, userData } = useSelector(
    (state) => state?.user
  );

  const [isEdit, setIsEdit] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    if (!validUser) {
      navigate("/login");
    }
  }, [validUser, userData, navigate]);

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
      if(username){
        fetchUserByUsername(username)
          .then((response) => {
            setUser(response);
          })
          .catch((error) => {
            setError(error?.message);
          });
      }
  }, [username]);

  useEffect(() => {
    if(user){
      fetchUserPosts(user?._id)
        .then((response) => {
          setPosts(response.posts);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  }, [user]);

  return (
    <>
      {!isEdit ? (
        <div className="w-full lg:h-screen justify-center items-center overflow-scroll no-scrollbar p-1">
          <ProfileCard user={user} setIsEdit={setIsEdit} />
          <div className="bg-black h-1 w-[60%] lg:mt-20 mt-5 ml-auto mr-auto"></div>
          <div className="overflow-auto h-full no-scrollbar">
              <div className=" grid lg:grid-cols-4 grid-cols-3 grid-flow-row lg:gap-9 gap-1 lg:p-5 p-1 w-fit h-fit ml-auto mr-auto overflow-hidden ">
                {posts?.map((post, index) => {
                  return <UserPosts post={post} key={post?._id} />;
                })}
              </div>
            {posts?.length === 0 ? (
              <div className="text-center">No posts to show</div>
            ) : error ? (
              <div className="text-center">{error?.message}</div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full lg:h-screen flex flex-col justify-center items-center overflow-scroll no-scrollbar p-1">
          <EditProfile setIsEdit={setIsEdit} />
        </div>
      )}
    </>
  );
}

export default UserProfile;
