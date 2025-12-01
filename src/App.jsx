// App component chính
import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import useAuthStore from "./store/authStore";

function App() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    // Load user from token when app starts
    loadUser();
    
    // Disable automatic scroll restoration to use browser default
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, [loadUser]);

  return (
    <div className="app-background">
      <AppRouter />
    </div>
  );
}

export default App;
