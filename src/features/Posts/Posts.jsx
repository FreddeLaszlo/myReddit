import PostCard from './PostCard';
import { loadPosts } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import ROUTES from '../../app/routes';
import Fetching from '../Fetching/Fetching';
import { Navigate } from 'react-router-dom';
import LoadMoreData from '../LoadMoreData/LoadMoreData';
import NoMoreData from '../NoMoreData/NoMoreData';



const Posts = () => {

    const { hasLoaded } = useSelector((state) => state.subreddits);
    if(!hasLoaded) {
        return <Navigate to={ROUTES.subRedditsRoute()} replace={true} />    
    }

    const dispatch = useDispatch();
    const { data, isLoading, after, hasError} = useSelector((state) => state.posts);
    
    
      
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
   
    const handleOnClick = () => {
        if(!isLoading) {
            dispatch(loadPosts()); 
        }
    }

    const moreOrFetching = () => {
        if(after && after.length !== 0 && !isLoading) {
            return <LoadMoreData clickHandler={handleOnClick}/>
        }
        if(isLoading) {
            return ( 
                <Fetching width="100%" height="100px"/>
            )
        }
        return <NoMoreData />
         
    }

    if(hasError) {
        return <Error />
    }

    return (
        <>
            {data.map(({ data }) => <PostCard key={data.id} data={data}/>)}
            {moreOrFetching()} 

        </>
    )
}

export default Posts;