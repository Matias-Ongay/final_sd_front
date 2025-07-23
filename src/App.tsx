import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProviderWithHistory } from "./auth/AuthProvider";
import PublicPage from "./pages/PublicPage";
import AdminPage from "./pages/AdminPage";
import UsersPage from "./api/admin/users";
import EndpointsTester from "./pages/EndpointsTester";

import Home from "./pages/Home";
import PrivatePage from "./pages/Private";

function App() {
  return (
    <BrowserRouter>
      <AuthProviderWithHistory>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/private" element={<PrivatePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/probar-endpoints" element={<EndpointsTester />} />

        </Routes>
      </AuthProviderWithHistory>
    </BrowserRouter>
  );
}

export default App;
