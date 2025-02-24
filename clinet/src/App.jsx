import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/common/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Books from "./pages/books/Book";
import { BookProvider } from "./context/BookContext";

import SearchBook from "./pages/books/SearchPage";
import { SearchBookProvider } from "./context/SearchBookContext";
import SingleBook from "./components/common/book/SingleBook";
import About from "./components/common/AboutUs";
import Contact from "./components/common/Contact";
import AuthPage from "./pages/auth/AuthPage";
import ProfilePage from "./pages/profile/ProfilePage";
import History from "./pages/profile/History";
import Favorite from "./pages/profile/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "books",
        element: (
          <BookProvider>
            <Books />
          </BookProvider>
        ),
      },
      {
        path: "search/:query",
        element: (
          <SearchBookProvider>
            <SearchBook />
          </SearchBookProvider>
        ),
      },
      {
        path: "book/:title",
        element: (
          <BookProvider>
            <SingleBook />
          </BookProvider>
        ),
      },
      {
        path: "signin",
        element: <AuthPage />,
      },
      {
        path: "signup",
        element: <AuthPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
