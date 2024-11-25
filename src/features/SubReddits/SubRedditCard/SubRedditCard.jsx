import { marked } from "marked";
import redditLogo from "/Reddit_Icon_FullColor.svg";
import './SubRedditCard.css';

const getShortDescription = (data) => {
    if (data.public_description && data.public_description !== "") return marked.parse(data.public_description);
    if (data.description && data.description !== "") return marked.parse(data.description);
    return "";
}

const icon = (data) => {
    if (data.icon_img && data.icon_img !== "") return <img src={data.icon_img} width="50px"></img>
    return <img src={redditLogo} width="50px"></img>
}

const SubRedditCard = ({ data }) => {

    return (
        <div className="redditCard">
            <h2>{icon(data)}{data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: getShortDescription(data) }}></div>
        </div>
    )
}

export default SubRedditCard;