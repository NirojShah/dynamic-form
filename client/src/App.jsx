import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/user/Login";
import Signup from "./component/pages/user/Signup";
import Home from "./component/pages/home/Home";

import getMe from "./utility/auth.api";

import Notifications from "./notification/notification.context";
import GlobalMessage from "./notification/GlobalMessage";

import { setNotifier } from "./notification/notification.service";
import Sample from "./component/Sample";
import userStore from "./store/user.store";
import MainLayout from "./component/pages/home/Home";
import MyForms from "./component/pages/form/myforms/MyForms";
import CreateForm from "./component/pages/form/create-form/CreateForm";
import FormPublic from "./component/pages/Form-Public/FormPublic";
import Analytics from "./component/pages/analytics/Analytics";
import FormResponse from "./component/pages/form response/FormResponse";
import UserCreation from "./component/pages/user/UserCreation";
import Template from "./component/pages/form/templates/Template";
import UpdateForm from "./component/pages/form/update-form/UpdateForm";
import Archive from "./component/pages/archive/Archive";
import Profile from "./component/pages/user/Profile";
import { Favorite } from "./component/pages/favorites/Favorite";
import ChatComponent from "./component/chat-component/ChatComponent";

const ProtectedRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;

  return isAuthorized ? <Navigate to="/" replace /> : children;
};

const AppContent = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const setUser = userStore((state) => state.setUser);
  // const name = userStore((state) => state.name);

  const notification = Notifications.useNotification();

  useEffect(() => {
    setNotifier(notification);
  }, [notification]);

  const checkIsAuthenticated = async () => {
    try {
      // if (!name) {
      const resp = await getMe();
      setUser({
        userName: resp.data?.name,
        email: resp.data?.email,
        organization: resp.data?.organizationName,
        orgId: resp.data?.orgId
      });
      setIsAuthorized(resp?.status === "success");
      // }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;

    const excludedRoutes = ["/login", "/signup", "/public"];

    const shouldSkip = excludedRoutes.some(route =>
      path.includes(route)
    );

    if (!shouldSkip) {
      checkIsAuthenticated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  return (
    <BrowserRouter>
      <GlobalMessage />

      <Routes>
        <Route
          path="/login"
          element={
            // <PublicRoute isAuthorized={isAuthorized} loading={loading}>
            <Login setAuthorization={setIsAuthorized} />
            // </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isAuthorized={isAuthorized} loading={loading}>
              <UserCreation />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sample"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <Sample />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            loading ? (
              <h1>Loading...</h1>
            ) : isAuthorized ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/home" element={<MainLayout />}>
          <Route index element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <MyForms />
            </ProtectedRoute>
          } />
          <Route path="update-form/:title/:organization" element={<UpdateForm />} />
          <Route path="create-form" element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}><CreateForm /></ProtectedRoute>
          } />
          <Route path="profile" element={<ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
            <Profile />
          </ProtectedRoute>} />
          <Route path="myforms" element={<ProtectedRoute isAuthorized={isAuthorized} loading={loading} >
            <MyForms />
          </ProtectedRoute>
          } />
          <Route path="shared" element={<h1>Shared with me</h1>} />
          <Route path="templates" element={<Template />} />
          <Route path="analytics" element={<ProtectedRoute isAuthorized={isAuthorized} loading={loading} >
            <Analytics />
          </ProtectedRoute>} />
          <Route path="favorites" element={<ProtectedRoute isAuthorized={isAuthorized} loading={loading} >
            <Favorite />
          </ProtectedRoute>} />
          <Route path="surveys" element={<h1>Surveys</h1>} />
          <Route path="archive" element={<Archive />} />
          <Route path="integrations" element={<h1>Integrations</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="response/:formId" element={<FormResponse />} />


          {/* Organization and Admin creation. */}
          <Route path="create-user" element={<UserCreation />} />

        </Route>

        <Route path="/new-user" element={<UserCreation />} />

        <Route path="/public/:key" element={<FormPublic />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Notifications.NotificationProvider>
      <AppContent />
    </Notifications.NotificationProvider>
  );
};

export default App;
