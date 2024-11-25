import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import myRedditLogo from '/myReddit_logo.svg';
import './AppLayout.css';


export default function AppLayout() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={ROUTES.subRedditsRoute()} >
                                <img src={myRedditLogo} width="50px"></img>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.subRedditsRoute()} >
                                Reddits
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.hotSubRedditsRoute()} >
                                Hot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.popularSubReddits()} >
                                Popular
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
