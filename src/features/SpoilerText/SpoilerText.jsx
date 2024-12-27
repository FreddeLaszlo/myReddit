import { useState } from "react"
import './SpoilerText.css';

const SpoilerText = ({text}) => {
    const [reveal, setReveal] = useState(false);
    
    const handleOnClick = (e) => {
        !reveal ? e.preventDefault() : false;
        setReveal(true);
    }

    return <div className={(reveal ? '' : 'spoilertext')} style={{display:"inline-block"}} onClick={handleOnClick}>{text}</div>
}

export default SpoilerText;