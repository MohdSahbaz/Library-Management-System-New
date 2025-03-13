import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NotFound from "./pages/NotFound";

import Sidebar from "./components/common/sidebar/Sidebar";

import Dashboard from "./pages/dashboard/Dashboard";

import Books from "./pages/books/Book";
import Pending from "./pages/books/Pending";
import Borrowed from "./pages/books/Borrowed";
import Overdue from "./pages/books/Overdue";
import AddBook from "./pages/books/AddBook";

import UsersList from "./pages/users/UsersList";

import Signin from "./pages/auth/Signin";
import Logout from "./pages/auth/Logout";

import LibrariansList from "./pages/librarian/LibrariansList";

import SearchResults from "./pages/books/SearchResults";

import { BookProvider } from "./context/BookContext";
import { SearchBookProvider } from "./context/SearchBookContext";
import SingleBook from "./components/common/SingleBook";
import User from "./pages/users/User";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Protect all routes inside
    children: [
      {
        path: "/",
        element: <Sidebar />,
        children: [
          { path: "", element: <Dashboard /> },
          {
            path: "books",
            element: (
              <BookProvider>
                <Books />
              </BookProvider>
            ),
          },
          {
            path: "book/:bookName",
            element: <SingleBook />,
          },
          {
            path: "add-book",
            element: <AddBook />,
          },
          {
            path: "search",
            element: (
              <SearchBookProvider>
                <SearchResults />{" "}
              </SearchBookProvider>
            ),
          },
          { path: "pending", element: <Pending /> },
          { path: "borrowed", element: <Borrowed /> },
          { path: "overdue", element: <Overdue /> },
          { path: "users", element: <UsersList /> },
          { path: "user/:userName", element: <User /> },
          { path: "librarian", element: <LibrariansList /> },
          { path: "logout", element: <Logout /> },
        ],
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
