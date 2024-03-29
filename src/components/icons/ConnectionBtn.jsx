import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { followUser, getConnections, unfollowUser } from '../../services/apiMethods';
import { showError } from '../../hooks/errorManagement';

function ConnectionBtn({user, color, width, height, setFollowers}) {
    const currentUser = useSelector((state)=> state?.user?.userData);
    const [following, setFollowing] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
      showError(error, setError);
    }, [error]);

    useEffect(()=> {
        getConnections(currentUser?._id).then((connection)=>{
            setFollowing(connection.following);
        }).catch((error)=>{
            setError(error?.message);
        })
    }, [currentUser]);

    const follow = () => {
        followUser(currentUser?._id, user?._id).then((response)=> {
            setFollowing(response.userConnection.following);
            setFollowers(response.followeeConnection.followers)
        }).catch((error) => {
            setError(error?.message);
        })
    }

    const unfollow = () => {
      unfollowUser(currentUser?._id, user?._id)
        .then((response) => {
          setFollowing(response.userConnection.following);
          setFollowers(response.followeeConnection.followers);
        })
        .catch((error) => {
          setError(error?.message);
        });
    };

  return (
    <>
      {
        !following?.includes(user?._id) ? (
          <button
            className={`w-${width || 36} h-${height || 9} rounded-lg bg-${
              color || "black"
            } font-medium hover:bg-${
              color !== "white" ? "slate-800" : "stone-700"
            } items-center`}
            onClick={follow}
          >
            Follow
          </button>
        ) : (
          <button
            className={`w-${width || 36} h-${height || 9} rounded-lg bg-${
              color || "black"
            } font-medium hover:bg-${
              color !== "white" ? "slate-800" : "stone-700"
            } items-center text-sm`}
            onClick={unfollow}
          >
            Unfollow
          </button>
        )}
    </>
  );
}

export default ConnectionBtn