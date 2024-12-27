import PostCard from './PostCard';
import { loadPosts, setSubRedditId, setUrl } from './PostsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ROUTES from '../../app/routes';
import Fetching from '../Fetching/Fetching';
import { Navigate } from 'react-router-dom';
import LoadMoreData from '../LoadMoreData/LoadMoreData';
import NoMoreData from '../NoMoreData/NoMoreData';
import { useEffect } from 'react';



const Posts = (props) => {

    const { data, isLoading, after, hasError, redditId } = useSelector((state) => state.posts);
    const dispatch = useDispatch();


    /*
    useEffect(() => {
    const onScroll = () => {
        console.log("onScroll event fired.");
        const scrolledToBottom = (window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight;
        if(scrolledToBottom && !isLoading) {
            dispatch(loadSubReddits());
        }
    }

    document.addEventListener("scroll", onScroll);

    return function () {
        document.removeEventListener("scroll", onScroll); 
    };
}, []);
*/

    useEffect(() => {
        if(redditId != props.redditId) {
            dispatch(setSubRedditId(props.redditId));
            dispatch(setUrl(props.url));
            dispatch(loadPosts());
        }
    }, [])

    const handleOnClick = () => {
        if (!isLoading) {
            dispatch(loadPosts());
        }
    }

    const moreOrFetching = () => {
        if (after && after.length !== 0 && !isLoading) {
            return <LoadMoreData clickHandler={handleOnClick} />
        }
        if (isLoading) {
            return (
                <Fetching width="100%" height="100px" />
            )
        }
        return <NoMoreData />

    }

    if (hasError) {
        return <Error />
    }

    return (
        <>
            {data.map(({ data }) => <PostCard key={`post_key_${data.id}`} data={data} />)}
            {moreOrFetching()}

        </>
    )
}

export default Posts;