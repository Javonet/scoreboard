import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Score from "./routes/score/Score.jsx";
import { Editor } from "./routes/editor/Editor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Score />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);