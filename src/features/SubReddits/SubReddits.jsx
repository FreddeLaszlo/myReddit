import { useEffect, useState } from "react";
import { useGetSubRedditsQuery } from "../../services/reddit";
import SubRedditCard from "./SubRedditCard/SubRedditCard";
import './SubReddits.css';

const SubReddits = () => {
    const [after, setAfter] = useState('');
    const { data, error, isFetching } = useGetSubRedditsQuery(after);

    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = (window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight;
            if(scrolledToBottom && !isFetching) {
                console.log("Fetching more data...");
                console.log(data.after);
                setAfter(data.after);
            }
        }

        document.addEventListener("scroll", onScroll);

        return function () {
            document.removeEventListener("scroll", onScroll);
          };

    }, [after, isFetching]);

    const handleOnClick = () => { setAfter(data.after) }

    const moreOrFetching = () => {
        if(after && after.length !== 0 && !isFetching) {
            return <div className="loadMore" onClick={handleOnClick}>Click or scroll to load more...<br/>&darr;</div>
        }
        if(isFetching) {
            return <p>Fetching data...</p>
        }
        return <p>No more Reddits</p>
         
    }

    if(error) return <p>{error}</p>

    const reddits = data?.children ?? [];

    return (
        <>
            {reddits.map(({ data }) => <SubRedditCard data={data} key={data.id}/>)}
            {moreOrFetching()} 

        </>
    )
}

export default SubReddits;