import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NotFound from "./pages/NotFound";
import Sidebar from "./components/common/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";

import Books from "./pages/books/Book";
import Pending from "./pages/books/Pending";
import Borrowed from "./pages/books/Borrowed";
import Overdue from "./pages/books/Overdue";

import Users from "./pages/users/Users";
import Signin from "./pages/auth/Signin";
import Librarian from "./pages/librarian/Librarian";
import Logout from "./pages/auth/Logout";
import SearchResults from "./pages/books/SearchResults";
import { BookProvider } from "./context/BookContext";
import { SearchBookProvider } from "./context/SearchBookContext";

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
          { path: "users", element: <Users /> },
          { path: "librarian", element: <Librarian /> },
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
