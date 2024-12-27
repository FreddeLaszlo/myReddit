import { useSelector } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";
import { fetchSubReddit } from './subRedditsSlice';
import SubRedditCard from './SubRedditCard';
import Posts from '../Posts/Posts';

import ROUTES from "../../app/routes";

const SubRedditPosts = () => {
  
  const { redditId } = useParams();
  const { hasLoaded } = useSelector((state) => state.subreddits);
  if (!hasLoaded) {
    return <Navigate to={ROUTES.subRedditsRoute()} replace={true} />
  }

  if (!redditId) {
    return <Navigate to={ROUTES.subRedditsRoute()} replace />
  }

  const info = useSelector((state) => fetchSubReddit(state, redditId));

  return <>
    <SubRedditCard data={info} shortDescription={false} />
    <Posts redditId={redditId} url={info.url} />
  </>
}

export default SubRedditPosts;