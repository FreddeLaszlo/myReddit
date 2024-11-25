import {
    Route,

    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate
} from "react-router-dom";
import SubReddits from "../features/SubReddits/SubReddits";
import AppLayout from "./AppLayout";

const loc = window.location.pathname;
const path = loc.length === 1 ? loc : loc.replace(/\/$/, '');

const setIndex = () => {
    if (window.location.pathname !== '/subreddits') {
        window.location.replace("/subreddits")
    } else {
        return <SubReddits />
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<SubReddits />} />
        <Route path="subreddits" element={<SubReddits />} />
      </Route>
    ), { basename: path, }
  )
  
  export default function App() {
    return (
      <>
        <RouterProvider router={router} />
      </>
    )
  }
  