import { useState } from "react";
import { authService } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

interface ForgotPasswordPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

type Step = "request" | "verify" | "reset";

export function ForgotPasswordPage({ onBack, onSuccess }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  // Step 1: Request OTP
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.sendResetOtp(email);
      setSuccess(response.message || "OTP sent to your email. Please check your inbox.");
      setStep("verify");
      startCountdown();
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.verifyResetOtp(email, otp);
      setResetToken(response.resetToken);
      setSuccess("OTP verified successfully. You can now reset your password.");
      setStep("reset");
    } catch (err: any) {
      setError(err.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.resetPassword(resetToken, newPassword);
      setSuccess(response.message || "Password reset successful! Redirecting to login...");
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer for resend OTP
  const startCountdown = () => {
    setCanResend(false);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    await handleSendOtp();
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
            <h1 className="font-['Arimo',sans-serif] text-white text-2xl tracking-wider">StockMaster</h1>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="font-['Arimo',sans-serif] text-white text-xl mb-2">
              {step === "request" && "Forgot Password"}
              {step === "verify" && "Verify OTP"}
              {step === "reset" && "Reset Password"}
            </h2>
            <p className="font-['Arimo',sans-serif] text-[#8ba6ac] text-base">
              {step === "request" && "Enter your email to receive a password reset code"}
              {step === "verify" && "Enter the 6-digit code sent to your email"}
              {step === "reset" && "Create a new password for your account"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Step 1: Request OTP */}
            {step === "request" && (
              <>
                <div>
                  <Label htmlFor="email" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendOtp()}
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                    placeholder="Enter your email"
                  />
                </div>

                <Button
                  onClick={handleSendOtp}
                  className="w-full bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 rounded-lg shadow-lg font-['Arimo',sans-serif] tracking-wider uppercase"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </>
            )}

            {/* Step 2: Verify OTP */}
            {step === "verify" && (
              <>
                <div>
                  <Label htmlFor="otp" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    onKeyPress={(e) => e.key === "Enter" && handleVerifyOtp()}
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif] text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 rounded-lg shadow-lg font-['Arimo',sans-serif] tracking-wider uppercase"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center">
                  <button
                    onClick={handleResendOtp}
                    disabled={!canResend}
                    className={`font-['Arimo',sans-serif] text-base ${
                      canResend
                        ? "text-[#00d9a3] hover:text-[#00c794] cursor-pointer"
                        : "text-[#6b8690] cursor-not-allowed"
                    }`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === "reset" && (
              <>
                <div>
                  <Label htmlFor="newPassword" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="font-['Arimo',sans-serif] text-[#b4cdd4] text-base mb-2 block">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleResetPassword()}
                    className="bg-[#2c4b52] border-[#3a5a62] text-white placeholder:text-[#6b8690] focus:ring-[#00d9a3] focus:border-[#00d9a3] h-12 rounded-lg font-['Arimo',sans-serif]"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button
                  onClick={handleResetPassword}
                  className="w-full bg-[#00d9a3] hover:bg-[#00c794] text-[#1e3338] h-12 rounded-lg shadow-lg font-['Arimo',sans-serif] tracking-wider uppercase"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-[#ff6b6b] text-sm text-center bg-[#ff6b6b]/10 p-3 rounded-lg border border-[#ff6b6b]/30">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="text-[#00d9a3] text-sm text-center bg-[#00d9a3]/10 p-3 rounded-lg border border-[#00d9a3]/30">
                {success}
              </div>
            )}

            {/* Back to Login */}
            <div className="text-center">
              <button
                onClick={onBack}
                className="font-['Arimo',sans-serif] text-[#00d9a3] hover:text-[#00c794] text-base"
              >
                ← Back to Login
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
