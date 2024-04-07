import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import HomePage from "./scenes/home";
import LoginPage from "./scenes/login";
import ProfilePage from "./scenes/profilePage";
import { themeSettings } from "./theme";
import PostPage from "./scenes/postPage";
import FriendsPage from "./scenes/friendsPage";
import UpdateProfile from "./scenes/updateProfile";
import ChatPage from "./scenes/chatPage";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route
            exact path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            exact path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route
            exact path="/:userId/post/:postId"
            element={isAuth ? <PostPage /> : <Navigate to="/" />}
          />
          <Route
            exact path="/friends"
            element={isAuth ? <FriendsPage /> : <Navigate to="/" />}
          />
          <Route
            exact path="/recieved-requests"
            element={isAuth ? <FriendsPage show="recievedRequests" /> : <Navigate to="/" />}
          />
          <Route
            exact path="/sent-requests"
            element={isAuth ? <FriendsPage show="sentRequests" /> : <Navigate to="/" />}
          />
          <Route
            exact path="/update-profile"
            element={isAuth ? <UpdateProfile /> : <Navigate to="/" />}
          />
          <Route
            exact path="/chats/:friendId"
            element={isAuth ? <ChatPage /> : <Navigate to="/" />}
          />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
