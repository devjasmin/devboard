import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile.tsx";
import BoardOverview from "../pages/BoardOverview/BoardOverview.tsx";
import BoardDetail from "../pages/BoardDetail/BoardDetail.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "boards",
          element: <BoardOverview />,
        },
        { path: "boards/:id", element: <BoardDetail /> },
      ],
    },
  ],
  {
    basename: "/devboard/",
  },
);
