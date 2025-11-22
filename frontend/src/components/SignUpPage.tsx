import { useState } from "react";
import { authService } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import logo from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

interface SignUpPageProps {
  onBack: () => void;
  onSignUp: (email?: string, password?: string) => void;
}

export function SignUpPage({ onBack, onSignUp }: SignUpPageProps) {
  const [fullName, setFullName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validateSignUp = async () => {
    const newErrors: string[] = [];

    if (!fullName.trim()) {
      newErrors.push("Full name is required");
    }

    if (loginId.length < 6 || loginId.length > 12) {
      newErrors.push("Login ID must be between 6-12 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Please enter a valid email address");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push("Password must be 8+ characters with uppercase, lowercase, and special character");
    }

    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    if (!agreeTerms) {
      newErrors.push("You must agree to the Terms and Conditions");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      setLoading(true);
      setErrors([]);
      try {
        // Use email as loginId for backend, and send name as fullName
        await authService.register({
          name: fullName,
          email,
          password,
          // Optionally: role: 'STAFF',
        });
        setLoading(false);
        onSignUp(email, password);
      } catch (err: any) {
        setLoading(false);
        // Show backend error if available
        if (err && err.message) {
          setErrors([err.message]);
        } else {
          setErrors(["Registration failed. Please try again."]);
        }
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
              <img src={logo} alt="Logo" className="w-6 h-6 object-contain filter brightness-0" />
            </div>
            <h1 className="font-['Arimo',sans-serif] text-white text-2xl tracking-wider">Stalk Master</h1>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="font-['Arimo',sans-serif] text-white text-xl mb-2">Sign Up Page</h2>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Create your account to get started</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="loginId" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Enter Login Id
              </Label>
              <Input
                id="loginId"
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                placeholder="Choose a unique login ID"
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Enter Email Id
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Enter Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif] pr-12"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b8690] hover:text-[#00d9a3]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                Re-Enter Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif] pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b8690] hover:text-[#00d9a3]"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="border-[#3a5a62] data-[state=checked]:bg-[#00d9a3] data-[state=checked]:border-[#00d9a3]"
              />
              <Label htmlFor="terms" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base">
                I agree to the{" "}
                <span className="text-[#00d9a3] cursor-pointer">Terms and Conditions</span>
              </Label>
            </div>

            {errors.length > 0 && (
              <div className="text-[#ff6b6b] text-xs bg-[#ff6b6b]/10 p-3 rounded-lg border border-[#ff6b6b]/30 space-y-1">
                {errors.map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </div>
            )}

            <Button
              onClick={validateSignUp}
              className="w-full bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 rounded-lg shadow-lg font-['Arimo',sans-serif] tracking-wider uppercase"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3a5a62]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#1e3338] px-4 font-['Arimo',sans-serif] text-[#6b8690] text-base">Or</span>
              </div>
            </div>

            <div className="text-center">
              <span className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">Already have an account? </span>
              <button
                onClick={onBack}
                className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base"
              >
                Sign In
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
