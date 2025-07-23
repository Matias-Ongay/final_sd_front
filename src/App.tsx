import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderWithHistory } from "./auth/AuthProvider";
import PublicPage from "./pages/PublicPage";
import AdminPage from "./pages/AdminPage";
import EndpointsTester from "./pages/EndpointsTester";
import Home from "./pages/Home";
import CreateUserPage from "./pages/CreateUserPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProviderWithHistory>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/probar-endpoints" element={<EndpointsTester />} />

        </Routes>
      </AuthProviderWithHistory>
    </BrowserRouter>
  );
}

export default App;
