import { throttleAsync } from "./throttle";

const baseUrl = 'https://www.reddit.com';

const fetchData = async (url, search, after) => {
    const throttledRun = throttleAsync(fetch, 6000);
    const urlEdited = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
    const params = buildParams(search, after);
    const fullUrl = `${baseUrl}${url}${params}`;
    try {
        const data = await throttledRun(fullUrl);
        if (data === false) { return false; }
        const json = await data.json();
        return json.data;
    } catch (error) {
        console.log(error);
    }
    return false;
}

const buildParams = (search, after) => {
    const useSearch = search.length > 0 ? true : false;
    const useAfter = after.length > 0 ? true : false;
    let params = useSearch ? '/search.json' : '.json'
    params += useSearch || useAfter ? '?' : '';
    params += useSearch ? `q=${search}` : '';
    params += useSearch && useAfter ? '&' : '';
    params += useAfter ? `after=${after}` : '';
    params == useSearch && useAfter ? '&raw_json=1' : '?raw_json=1';
    return params;
}

const getSubRedditIcon = (data) => {
    const { icon_img, community_icon } = data;
    const src = icon_img && icon_img.length > 0 ? icon_img :
        community_icon && community_icon.length > 0 ? community_icon.split('?')[0] : '';   
    return htmlDecode(src);
}

const getPreviewImage = (data) => {
    if (data.preview) {
        let img = data.preview.images[0].source.url ? data.preview.images[0].source.url : false;
        if (img) {
            return htmlDecode(img);
        }
    }
    return false;
}



const getGalleryImages = (data) => {
    const { gallery_data, media_metadata} = data;
    if(gallery_data && gallery_data.items && media_metadata) {
        let items = [];
        gallery_data.items.forEach(image => {
            if(media_metadata[image.media_id]) {
                let newImage = {
                    caption: image.caption,
                    url: htmlDecode(media_metadata[image.media_id].s.u)
                }
                items.push(newImage);
            }
        })
        return items.length > 0 ? items : false;
    }
    return false;
}

/**
 * Try to retrieve an image from subreddit/post/comment that can
 * be used as a thumbnail
 * @param   {Object} data
 *          subReddit/post/comments data 
 * @return  {String|false} URL
 *          The URL of an image, or false if none
 */
const getThumbnail = (data) => {
    let img = data.thumbnail ? data.thumbnail : null;
    let thumb = img;
    if (img) {
        switch (img) {
            case 'self':
                thumb = 'https://www.reddit.com/static/self_default2.png';
                break;
            case 'default':
                thumb = 'https://www.reddit.com/static/noimage.png';
                break;
            case 'spoiler':
                thumb = getPreviewImage(data);
                break;
            case 'nsfw':
            case '':
            case false:
                thumb = 'https://www.reddit.com/static/nsfw2.png';
                break;
        }
    }
    return thumb;
}

/**
 * 
 * @param {Object} data - The data that encapsulates a reddit post.
 * @param {number} data.created - Number of seconds since 1 Jan 1970 post was created.
 * @returns {string} An approximation of how long ago post was created.
 */
const getPostAge = (data) => {

    if(!data.created) return '';
    
    const created = data.created;
    const now = Math.floor(Date.now() / 1000);
    const age = now - created;

    const years = Math.floor(age / 3.154e+7 )
    if(years > 0) {
        return `more than ${years} year` + (years > 1 ? 's' : '') + ' ago';
    }

    const months = Math.floor(age / 2.628e+6 )
    if(months > 0) {
        return `more than ${months} month` + (months > 1 ? 's' : '') + ' ago';
    }

    const weeks = Math.floor(age / 604800);
    if(weeks > 0) {
        return `more than ${weeks} week` + (weeks > 1 ? 's' : '') + ' ago';
    }

    const days = Math.floor(age / 86400);
    if(days > 0) {
        return `about ${days} day` + (days > 1 ? 's' : '') + ' ago';
    }

    const hours = Math.floor(age / 3600);
    if(hours > 0) {
        return `about ${hours} hour` + (hours > 1 ? 's' : '') + ' ago'; 
    }

    const minutes = Math.floor(age / 60);
    if(minutes > 0 ) {
        return `about ${minutes} minute` + (minutes > 1 ? 's' : '') + ' ago'; 
    }

    return 'A few seconds ago';

}    

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

export { fetchData, getThumbnail, getGalleryImages, getPostAge, getSubRedditIcon };

