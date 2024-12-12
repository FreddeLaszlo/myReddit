import { useState, useLayoutEffect } from 'react';
import redditLogo from '/Reddit_Icon_FullColor.svg';
import './Image.css';

const Image = (props) => {
    const { src, alt, handleonerror = null } = props;
    const [style, setStyle] = useState();
    const [imageSrc, setImageSrc] = useState(src);

    // Set to spinner mode BEFORE painted to screen to avoid flicker
    useLayoutEffect(() => {
        setStyle({ animation: "spinner 5s", animationIterationCount: "infinite" })
    }, [])

    return <img
        {...props}
        src={imageSrc}
        alt={alt}
        style={style}
        onLoad={() => { setStyle({ animation: "fadeIn 1s" }) }}
        onError={(e) => { 
            e.target.onerror = null; // Stop infinite loop
            if(handleonerror !== null) {
                handleonerror();
            } else {
                setImageSrc(redditLogo); 
            }
        }}
    />
}

export default Image;
