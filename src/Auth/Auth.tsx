export const logout = (navigate: any) => {
    navigate("/login/");
    sessionStorage.clear();
    isLoggedIn(false)
  };
  
  export const isLoggedIn = (isLogged?: boolean) => {
    const hasCredentials = !!sessionStorage.getItem("credentials");
    const hasApiToken = !!sessionStorage.getItem("apiToken");
  
    return hasCredentials || isLogged || hasApiToken;
  };