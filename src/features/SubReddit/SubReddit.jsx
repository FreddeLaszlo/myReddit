import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { fetchSubReddit } from '../SubReddits/subRedditsSlice';
import SubRedditCard from '../SubReddits/SubRedditCard';
import { setUrl, loadPosts } from '../Posts/postsSlice';
import Posts from '../Posts/Posts';

import ROUTES from "../../app/routes";

const SubReddit = () => {
  const { redditId } = useParams();
  const dispatch = useDispatch();

  if (!redditId) {
    return <Navigate to={ROUTES.subRedditsRoute()} replace />
  }

  const info = useSelector((state) => fetchSubReddit(state, redditId));
  dispatch(setUrl(info.url));
  dispatch(loadPosts());

  return <>
    <SubRedditCard data={info} shortDescription={false} />
    <Posts />
  </>
}

export default SubReddit;