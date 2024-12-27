import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { fetchPost } from '../Posts/PostsSlice'
import { loadComments, setUrl, setPostId } from '../Comments/CommentsSlice';
import PostCard from '../Posts/PostCard';
import Comments from '../Comments/Comments';
import { useEffect } from 'react';

import ROUTES from "../../app/routes";

const PostComments = () => {

  const { postId } = useParams();
  const { hasLoaded } = useSelector((state) => state.posts);
  const { data } = useSelector((state) => state.comments);
  if (!hasLoaded) {
    return <Navigate to={ROUTES.subRedditsRoute()} replace={true} />
  }

  if (!postId) {
    return <Navigate to={ROUTES.subRedditsRoute()} replace={true} />
  }

  const info = useSelector((state) => fetchPost(state, postId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPostId(postId));
    dispatch(setUrl(info.permalink));
    dispatch(loadComments());
  }, [])

  return <>
    <PostCard data={info} shortDescription={false} />
    <Comments data={data}/>
  </>
}

export default PostComments;
