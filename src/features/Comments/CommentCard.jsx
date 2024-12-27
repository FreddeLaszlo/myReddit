import Image from '../Image/Image';
import { marked } from "marked";
import DOMPurify from "dompurify";
import { getGalleryImages, getPostAge } from '../../api/redditApi';
import Spoiler from '../Spoiler/Spoiler';
import Stickied from '../Stickied/Stickied';
import Comments from './Comments';
import './CommentCard.css';
import markdownToReact from '../../api/helpers';
import { useEffect, useState } from 'react';


// Stop clicks to a hrefs inside the comment from propogating in this app
const handleHrefClick = (e) => {
    e.stopPropagation();
    return true;
}


const Gallery = (gallery) => {
    console.log(gallery);
    if (gallery.gallery && gallery.gallery.length > 0) {
        console.log(gallery.gallery[0].url);
        return (
            <Image src={gallery.gallery[0].url} alt="Gallery image." width="100%" />
        );
    }
    return false;
}



const CommentCard = ({ data }) => {

    console.log(data);

    const gallery = getGalleryImages(data);
    const postAge = getPostAge(data);
    const body = data.body ? data.body : '--';
    const { title, author, selftext, spoiler, stickied, depth } = data;



    const handleOnClick = (e) => {
        //alert("Clicked: " + data.id);
    }


    const parsed = markdownToReact(body);

    return (
        <article className="commentcard" onClick={handleOnClick}>
            <div className='author'>{author} <span className='age'>{postAge}</span></div>
            <div id={`comment_${data.id}`}>{parsed}</div>
            {data.replies && data.replies.data && <Comments data={data.replies.data.children} indent={depth}/>}
        </article>
    )
}

export default CommentCard;