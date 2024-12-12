import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import myRedditLogo from '/myReddit_logo.svg';
import Search from "../features/Search/Search";
import Footer from "../features/Footer/Footer";
import './AppLayout.css';



export default function AppLayout() {

    return (
        <>
            <header>
                <nav>
                    <NavLink to={ROUTES.subRedditsRoute()} >
                        <img src={myRedditLogo} id="logo"></img>
                    </NavLink>
                    <Search />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
