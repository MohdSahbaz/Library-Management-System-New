import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/common/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Books from "./pages/books/Book";
import Users from "./pages/users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "users",
        element: <Users />,
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
