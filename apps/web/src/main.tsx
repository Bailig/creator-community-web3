/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

const App = React.lazy(() => import("./containers/app"));

const Home = () => <></>;
const Profile = () => <></>;
const UserPostList = () => <></>;

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/user/:username/post/:postId"
            element={<UserPostList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
