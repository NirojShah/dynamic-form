import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { NotificationProvider } from './notification/notification.context.jsx'
import Notifications from "./notification/notification.context.jsx";

createRoot(document.getElementById("root")).render(
  <Notifications.NotificationProvider>
    <App />
  </Notifications.NotificationProvider>,
);
