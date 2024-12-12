import Image from "../Image/Image";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../app/routes";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState, useLayoutEffect, useEffect } from "react";
import { getSubRedditIcon } from "../../api/redditApi";
import './SubRedditCard.css';


const getShortDescription = (data) => {
    if (data.public_description && data.public_description !== "") return marked.parse(data.public_description);
    return "";
}

const getPublicDescription = (data) => {
    if (data.description && data.description !== "") return marked.parse(data.description);
    return "";
}

const handleHrefClick = (e) => {
    e.stopPropagation();
    return true;
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


    useEffect(() => {
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

    if (description.length > 0) {
        if (shortDescription) {
            return (
                <div id={`description_${data.id}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></div>
            )
        }
        return (
            <>
                <div className={styleClass}>
                    <span></span>
                    <div id={`description_${data.id}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></div>
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
            document.getElementById(data.id).click();
        }
    }

    const url = ROUTES.subReddit(data.id);
    const nav = useNavigate();

    // Note Link is not displayed, so Link styling does not affect subreddit styling. 
    // The Link is activated by the div onClick handler.
    return (
        <div className={pointer} onClick={handleClick}>
            <Link to={url} id={data.id} style={{ display: "none" }} />
            
            <h2>{icon(data)}{data.title}</h2>
            <MoreInfo data={data} shortDescription={shortDescription}></MoreInfo>
        </div>

    )
}

export default SubRedditCard;