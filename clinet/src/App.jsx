import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/common/header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Books from "./pages/books/Book";
import { BookProvider } from "./context/BookContext";
import SearchBook from "./pages/books/SearchPage";

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
        path: "search/:searchKey",
        element: <SearchBook />,
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
