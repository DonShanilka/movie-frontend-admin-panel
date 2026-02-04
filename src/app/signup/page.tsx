"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/redux/slices/authSlice";
import Link from "next/link";
import { Mail, Lock, User, Loader2, Play } from "lucide-react";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(loginFailure("Passwords do not match"));
            return;
        }

        dispatch(loginStart());

        // Simulate API call
        setTimeout(() => {
            dispatch(
                loginSuccess({
                    user: { id: "2", name: name, email: email },
                    token: "fake-jwt-token",
                })
            );
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400/10 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse delay-700" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-400/20 mb-6 -rotate-3">
                        <Play className="w-8 h-8 text-black fill-current ml-1" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                    <p className="text-zinc-400 mt-2">Join us and start streaming today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400/50 transition-all placeholder:text-zinc-600"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400/50 transition-all placeholder:text-zinc-600"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400/50 transition-all placeholder:text-zinc-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400/50 transition-all placeholder:text-zinc-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl shadow-xl shadow-yellow-400/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-2"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account
                                <Play className="w-4 h-4 fill-current group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-zinc-400 mt-10 text-sm">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-yellow-400 font-semibold hover:underline decoration-2 underline-offset-4">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
