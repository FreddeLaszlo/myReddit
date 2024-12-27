
import { setUrl, loadComments, setPostId } from "./CommentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Fetching from "../Fetching/Fetching";
import Error from "../Error/Error";
import NoMoreData from "../NoMoreData/NoMoreData";
import LoadMoreData from "../LoadMoreData/LoadMoreData";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { fetchPost } from "../Posts/PostsSlice";
import CommentCard from "./CommentCard";
import './Comments.css';

const Comments = ({ data, indent=0 }) => {
    console.log(`Comments.indent: ${indent}`);
    console.log('Comments.data:');
    console.log(data);

    const { isLoading, hasError } = useSelector((state) => state.comments);

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

    if (isLoading) {
        return <Fetching width="100%" height="100px" />
    }

    if (hasError) {
        return <Error />
    }

    console.log(data);
    return (
        <div style={{marginLeft:indent ? "40px" : "0"}}>
            {data.map(({ data }) => <CommentCard key={`comment_key_${data.id}`} data={data} />)}
        </div>
    )
}

export default Comments;