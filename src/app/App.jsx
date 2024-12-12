import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import SubReddits from "../features/SubReddits/SubReddits";
import SubReddit from "../features/SubReddit/SubReddit";
import AppLayout from "./AppLayout";
import { loadSubReddits } from '../features/SubReddits/subRedditsSlice';
import { useDispatch, useSelector } from 'react-redux';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<SubReddits />} />
      <Route path="/" element={<SubReddits />} />
      <Route path="/:redditId" element={<SubReddit />} />
    </Route>
  ), { basename: import.meta.env.VITE_BASENAME, }
)

export default function App() {
  const dispatch = useDispatch();

  dispatch(loadSubReddits());
  return ( 
    <>
      <RouterProvider router={router} />
    </>
  )
}
