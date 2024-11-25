import myRedditLogo from '/myReddit_logo.svg';
import './Header.css';

const Header = () => {
    return (
        <header>
            
            <h1><img src={myRedditLogo} width="50px"></img>This is the header</h1>
        </header>
    ) 
}

export default Header;