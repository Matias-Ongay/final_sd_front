// src/auth/useAuth.ts
import { useAuth0 } from "@auth0/auth0-react";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  // Cambia esto si configuraste el claim personalizado en otro namespace
  const roles: string[] = user?.["https://final-sd-api/roles"] || [];

  return {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isAdmin: roles.includes("Admin"),
    isUser: roles.includes("Usuario"),
  };
};
