import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import SubReddits from "../features/SubReddits/SubReddits";
import SubRedditPosts from "../features/SubReddits/SubRedditPosts";
import PostComments from "../features/Posts/PostComments";
import AppLayout from "./AppLayout";
import { loadSubReddits } from '../features/SubReddits/subRedditsSlice';
import { useDispatch } from 'react-redux';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<SubReddits />} />
      <Route path="/" element={<SubReddits />} />
      <Route path="/:redditId" element={<SubRedditPosts />} />
      <Route path="/post/:postId" element={<PostComments />} />
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
