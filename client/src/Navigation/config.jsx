import { createBrowserRouter } from "react-router-dom";

import {
  ROOT,
  BOOK,
  // CATEGORY,
  // CATEGORY_SECTION,
  // PROFILE,
  // LOVED_BOOKS,
  // NOT_FOUND,
} from "./paths";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Book from "../pages/Book/Book";

export const routerConfig = createBrowserRouter([
  {
    path: ROOT,
    element: <Layout />,
    children: [
      { path: ROOT, element: <Home /> },
      { path: BOOK, element: <Book /> },
      //   { path: CATEGORY, element: <Category /> },
      //   { path: CATEGORY_SECTION, element: <CategorySection /> },
      //   { path: PROFILE, element: <Profile /> },
      //   { path: LOVED_BOOKS, element: <LovedBooks /> },
      //   { path: NOT_FOUND, element: <NotFound /> },
    ],
  },
]);
