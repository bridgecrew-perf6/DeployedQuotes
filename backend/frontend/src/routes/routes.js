import Counter from "../features/counter/Counter";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/home/Home";
import CreateQuote from "../pages/quote/CreateQuote";
import Profile from "../pages/usrerProfile/Profile";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:otherUserId",
    element: <Profile />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "*",
    element: <Home />,
  },
];

export default routes;
