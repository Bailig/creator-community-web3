import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./containers";
import "./index.css";

const Home = () => <></>;
const Profile = () => <></>;
const UserPostList = () => <></>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
