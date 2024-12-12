import Image from '../Image/Image';
import { marked } from "marked";
import DOMPurify from "dompurify";
import { getGalleryImages, getPostAge } from '../../api/redditApi';
import './PostCard.css';
import { useEffect, useState } from 'react';


// Stop clicks to a hrefs inside the post from propogating in this app
const handleHrefClick = (e) => {
    e.stopPropagation();
    return true;
}

const Gallery  = (gallery) => {
    console.log(gallery);
    if(gallery.gallery && gallery.gallery.length > 0) {
        console.log(gallery.gallery[0].url);
        return (
            <Image src={gallery.gallery[0].url} alt="Gallery image." width="100%"/>
        );
    }
    return false;
}



const PostCard = ({ data }) => {

    console.log(data);

    const gallery = getGalleryImages(data);
    const postAge = getPostAge(data);
    const { title, author, selftext} = data;

    useEffect(() => {
        // Refactor all a hrefs in the post to _blank tab.
        // Each a href is handled by handleHrefClick to stop the app responding.
        const html = document.getElementById(`description_${data.id}`);
        const hrefs = html ? html.getElementsByTagName('a') : [];

        for (let i = 0; i < hrefs.length; i++) {
            hrefs[i].setAttribute("target", "_blank");
            hrefs[i].addEventListener("click", handleHrefClick);
        }

        return function () {
            const html = document.getElementById(`description_${data.id}`);
            const hrefs = html ? html.getElementsByTagName('a') : [];
            for (let i = 0; i < hrefs.length; i++) {
                hrefs[i].removeEventListener("click", handleHrefClick);
            }
        }

    }, []);

    return (
        <article className="postcard">
            <div className='author'>{author} <span className='age'>{postAge}</span></div>
            <h3>{title}</h3>
            <div id={`description_${data.id}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(selftext)) }}></div>
            <Gallery gallery={gallery} style={{margin: "10px"}}/>
        </article>
    )
}

export default PostCard;