import SubRedditCard from "./SubRedditCard";
import { loadSubReddits } from '../SubReddits/subRedditsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Fetching from "../Fetching/Fetching";
import Error from "../Error/Error";
import NoMoreData from "../NoMoreData/NoMoreData";
import LoadMoreData from "../LoadMoreData/LoadMoreData";
import './SubReddits.css';

const SubReddits = () => {

    const dispatch = useDispatch();
    const { data, isLoading, after, hasError} = useSelector((state) => state.subreddits);
      
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
            dispatch(loadSubReddits()); 
        }
    }

    const moreOrFetching = () => {
        if(after && after.length !== 0 && !isLoading) {
            //return <div className="loadMore" onClick={handleOnClick}>Click or tap to load more...<br/>&darr;</div>
            return <LoadMoreData clickHandler={handleOnClick}/>
        }
        if(isLoading) {
            return ( 
                <Fetching width="100%" height="100px" />
            )
        }
        return <NoMoreData />
         
    }

    if(hasError) {
        return <Error />
    }

    return (
        <>
            {data.map(({ data }) => <SubRedditCard data={data} key={data.id}/>)}
            {moreOrFetching()} 

        </>
    )
}

export default SubReddits;