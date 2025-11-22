import { useState } from "react";
import { authService } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

interface LoginPageProps {
  onSignUp: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
}

export function LoginPage({ onSignUp, onLogin, onForgotPassword }: LoginPageProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!loginId || !password) {
      setError("Please enter both Login ID and Password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Try login with backend (loginId is email in backend)
      await authService.login({ email: loginId, password });
      setLoading(false);
      onLogin();
    } catch (err: any) {
      setLoading(false);
      if (err && err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#2c4b52] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-[#1e3338] rounded-2xl border border-[#3a5a62] p-8 shadow-2xl">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-[#00d9a3] rounded-lg size-10 flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-30 h-30 object-contain filter brightness-0" />
            </div>
            <h1 className="font-['Arimo',sans-serif] text-white text-2xl tracking-wider">Stalk Master</h1>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="font-['Arimo',sans-serif] text-white text-xl mb-2">Login Page</h2>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="loginId" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Login Id
              </Label>
              <Input
                id="loginId"
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                placeholder="Enter your login ID"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-[#ff6b6b] text-sm text-center bg-[#ff6b6b]/10 p-3 rounded-lg border border-[#ff6b6b]/30">
                {error}
              </div>
            )}

            <Button
              onClick={handleSignIn}
              className="w-full bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 rounded-lg shadow-lg font-['Arimo',sans-serif] tracking-wider uppercase"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center space-x-2">
              <button
                onClick={onForgotPassword}
                className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base"
              >
                Forget Password?
              </button>
              <span className="text-[#6b8690]">|</span>
              <button
                onClick={onSignUp}
                className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="font-['Arimo',sans-serif] text-[#6b8690] text-base text-center mt-6">
          © 2025 Inventory. All rights reserved.
        </p>
      </div>
    </div>
  );
}
