import { marked } from 'marked';
import DOMPurify from 'dompurify'
import parse, { domToReact } from 'html-react-parser';
import SpoilerText from '../features/SpoilerText/SpoilerText';
import LinkExternal from '../features/LinkExternal/LinkExternal';

const regexSpoiler = />!(.*?)!</g;

const findSpoilers = (text) => {
    console.log(('findSpoilers'));
    const pos = text.search('>!');
    if(pos >= 0) console.log('Found in text');
    let array1;
    let text2 = text.replaceAll('&gt;', '>');
    text2 = text2.replaceAll('&lt;', '<')
    let result = text2;
    while ((array1 = regexSpoiler.exec(text2)) !== null) {
        console.log('found spoiler: ');
        const spoiler = `<spoiler-text>${array1[1]}</spoiler-text>`;
        result = result.replace(array1[0], spoiler);
        console.log('Found spoiler: ' + spoiler)
    }
    
    return result;
}

const markdownToHtml = (md) => {
    console.log('markdownToHtml');
    // Find spoilers and replace them with HTML tags 
    const mdWithSpoilerTags = findSpoilers(md);

    // Convert result to HTML
    const html = marked.parse(mdWithSpoilerTags);

    // Ensure nothing bad in HTML (XSS, etc)
    const htmlSafe = DOMPurify.sanitize(html, { ADD_TAGS: ["spoiler-text"]});

    return htmlSafe;
}

const replaceHtmlWithReact = (domNode) => {
    switch (domNode.name) {
        case 'spoiler-text':
            return <SpoilerText text={domToReact(domNode.children, { replace: replaceHtmlWithReact })}></SpoilerText>
        case 'a':
            console.log("Found external link");
            return <LinkExternal href={domNode.attribs.href} text={domToReact(domNode.children, { replace: replaceHtmlWithReact })} />
    }
}

/**
 * Convert markdo9wn to React components
 * @param {String} md - markdown to convert 
 * @returns String React components
 */
const markdownToReact = (md) => {
    console.log('markdownToReact');
    const html = markdownToHtml(md);
    const parsed = parse(html, { replace: replaceHtmlWithReact });
    return parsed;
}

export default markdownToReact;

