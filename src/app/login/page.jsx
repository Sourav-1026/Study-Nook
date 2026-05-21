"use client";
import React from "react";
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { BiCheck } from "react-icons/bi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log({ data, error });

    if (data) {
      toast.success("Successfully Logged In");
      redirect("/");
    }
  };

  const signInWithGoogle = async () => {
    const user = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-2">Login to your StudyNook account.</p>
        </div>

        <div className="bg-[#0d1f3c] rounded-2xl p-6 sm:p-8 border border-white/10">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Email</Label>
              <Input
                placeholder="john@example.com"
                className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password */}
            <TextField isRequired minLength={6} name="password" type="password">
              <Label className="text-slate-400 text-xs tracking-widest uppercase mb-1.5 block">Password</Label>
              <Input
                placeholder="••••••••"
                className="w-full bg-[#162d4a] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Submit */}
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-[#0d1f3c] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-1">
              <BiCheck size={18} />
              Login
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-500 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google */}
            <Button
              type="button"
              onClick={signInWithGoogle}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FcGoogle size={18} />
              Continue with Google
            </Button>
          </Form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
