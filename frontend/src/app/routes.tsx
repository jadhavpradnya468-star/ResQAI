import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { ImageUpload } from "./components/ImageUpload";
import { NearbyVets } from "./components/NearbyVets";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "upload", Component: ImageUpload },
      { path: "vets", Component: NearbyVets },
      { path: "dashboard", Component: Dashboard },
    ],
  },
]);
