import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "./services/api";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { Dashboard } from "./components/Dashboard";
import { ReceiptsPage } from "./components/ReceiptsPage";
import { DeliveryPage } from "./components/DeliveryPage";
import { StockPage } from "./components/StockPage";
import { ProductsPage } from "./components/ProductsPage";
import { WarehousePage } from "./components/WarehousePage";
import { MoveHistoryPage } from "./components/MoveHistoryPage";
import { SettingsPage } from "./components/SettingsPage";
import { WarehouseSettingsPage } from "./components/WarehouseSettingsPage";
import { LocationSettingsPage } from "./components/LocationSettingsPage";
import "./styles/globals.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  type Page = "login" | "signup" | "dashboard" | "operations" | "receipts" | "delivery" | "stock" | "products" | "warehouse" | "history" | "settings" | "settings-warehouse" | "settings-location" | "forgot-password";

  // Map path to page type
  const pathToPage = (pathname: string): Page => {
    switch (pathname) {
      case "/login": return "login";
      case "/signup": return "signup";
      case "/dashboard": return "dashboard";
      case "/operations": return "operations";
      case "/receipts": return "receipts";
      case "/delivery": return "delivery";
      case "/stock": return "stock";
      case "/products": return "products";
      case "/warehouse": return "warehouse";
      case "/history": return "history";
      case "/settings": return "settings";
      case "/settings-warehouse": return "settings-warehouse";
      case "/settings-location": return "settings-location";
      case "/forgot-password": return "forgot-password";
      default: return "signup";
    }
  };

  const currentPage = pathToPage(location.pathname);

  useEffect(() => {
    // On mount, check if user is authenticated
    (async () => {
      try {
        await authService.getCurrentUser();
        setIsAuthenticated(true);
        if (["/", "/signup", "/login"].includes(location.pathname)) {
          navigate("/dashboard", { replace: true });
        }
      } catch {
        setIsAuthenticated(false);
        if (location.pathname !== "/signup") {
          navigate("/signup", { replace: true });
        }
      } finally {
        setCheckingAuth(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  // After successful sign up, log in the user and go to dashboard
  const handleSignUp = async (email?: string, password?: string) => {
    if (email && password) {
      try {
        await authService.login({ email, password });
        setIsAuthenticated(true);
        navigate("/dashboard");
        return;
      } catch {
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }
    }
    navigate("/login");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleNavigate = (page: string) => {
    // Protect all pages except login/signup/forgot-password
    if (!isAuthenticated && ["dashboard", "operations", "receipts", "delivery", "stock", "products", "warehouse", "history", "settings", "settings-warehouse", "settings-location"].includes(page)) {
      navigate("/login");
      return;
    }
    navigate(`/${page}`);
  };

  const renderPage = () => {
    if (checkingAuth) {
      return <div className="text-white p-8">Checking authentication...</div>;
    }
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            onSignUp={() => navigate("/signup")}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
        );
      case "signup":
        return (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "dashboard":
        return isAuthenticated ? (
          <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "receipts":
      case "operations":
        return isAuthenticated ? (
          <ReceiptsPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "delivery":
        return isAuthenticated ? (
          <DeliveryPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "stock":
        return isAuthenticated ? (
          <StockPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "products":
        return isAuthenticated ? (
          <ProductsPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "warehouse":
        return isAuthenticated ? (
          <WarehousePage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "history":
        return isAuthenticated ? (
          <MoveHistoryPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "settings":
        return isAuthenticated ? (
          <SettingsPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "settings-warehouse":
        return isAuthenticated ? (
          <WarehouseSettingsPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "settings-location":
        return isAuthenticated ? (
          <LocationSettingsPage onNavigate={handleNavigate} />
        ) : (
          <SignUpPage
            onBack={() => navigate("/login")}
            onSignUp={handleSignUp}
          />
        );
      case "forgot-password":
        return <div>Forgot Password Page (to implement)</div>;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return renderPage();
}
