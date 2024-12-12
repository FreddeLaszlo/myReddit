import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSubReddits, setSearch } from '../SubReddits/subRedditsSlice';

import './Search.css';

const Search = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.subreddits);

    const handleOnChange = (e) => {
        setText(e.target.value);
    }

    const handleOnClick = () => {
        if (!isLoading) {
            dispatch(setSearch(text));
            dispatch(loadSubReddits());
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }



    return (
        <div id="searchbar">
            <input type="text" id="search" onChange={handleOnChange} onKeyDown={handleOnKeyDown} placeholder="Search topics" />
            <button id="search_button" onClick={handleOnClick}>&#128270;</button>
        </div>
    )

}

export default Search;