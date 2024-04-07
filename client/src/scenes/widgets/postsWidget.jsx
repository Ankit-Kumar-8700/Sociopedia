import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";
import PostWidget from "./postWidget";

const PostsWidget = ({ userId, isProfile = false, postId, isPost = false }) => {

    const serverLink="http://localhost:8000";

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${serverLink}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${serverLink}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPost = async () => {
    const response = await fetch(
      `${serverLink}/posts/${postId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: [data] }));
  };

  useEffect(() => {
    if(isPost){
      getPost();
    }
    else if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picPath,
          userPicPath,
          likes,
          comments,
        }) => 
        {
          return <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picPath={picPath}
            userPicPath={userPicPath}
            likes={likes}
            comments={comments}
          />
          
        }
      )}
    </>
  );
};

export default PostsWidget;