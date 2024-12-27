import Image from "../Image/Image";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { getSubRedditIcon } from "../../api/redditApi";
import markdownToReact from "../../api/helpers";
import './SubRedditCard.css';


const getShortDescription = (data) => {
    if (data.public_description && data.public_description !== "") return marked.parse(data.public_description);
    return "";
}

const getPublicDescription = (data) => {
    if (data.description && data.description !== "") return marked.parse(data.description);
    return "";
}

const icon = (data) => {
    const src = getSubRedditIcon(data);
    return <Image src={src} />
}

const MoreInfo = ({ data, shortDescription }) => {
    const [reveal, setReveal] = useState(false);

    const description = shortDescription ? getShortDescription(data) : getPublicDescription(data);
    const styleClass = reveal ? 'scrolldown reveal' : 'scrolldown hide';
    const showInfoText = reveal ? 'hide info ▲' : 'show info ▼';

    const handleReveal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setReveal(prev => prev ? false : true);
    }


    const parsed = markdownToReact(description);

    if (description.length > 0) {
        if (shortDescription) {
           return <div id={`description_${data.id}`}>{parsed}</div>
        }
        return (
            <>
                <div className={styleClass}>
                    <span></span>
                    <div id={`description_${data.id}`}>{parsed}</div>
                </div>
                <a href="." className="showhide" onClick={handleReveal}>{showInfoText}</a>
            </>
        );
    }
    return false;
}

const SubRedditCard = ({ data, shortDescription = true }) => {

    const pointer = shortDescription ? 'redditCard redditCard-pointer' : 'redditCard';

    const handleClick = () => {
        if (shortDescription) {
            document.getElementById(`reddit_${data.id}`).click();
        }
    }

    const url = ROUTES.subReddit(data.id);

    // Note Link is not displayed, so Link styling does not affect subreddit styling. 
    // The Link is activated by the div onClick handler.
    return (
        <div className={pointer} onClick={handleClick}>
            <Link to={url} id={`reddit_${data.id}`} style={{ display: "none" }} />

            <h2>{icon(data)}{data.title}</h2>
            <MoreInfo data={data} shortDescription={shortDescription}></MoreInfo>
        </div>

    )
}

export default SubRedditCard;