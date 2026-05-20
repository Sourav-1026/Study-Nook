"use client";
import React from "react";
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { BiCheck } from "react-icons/bi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

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
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold text-center mb-6">User Login Page</h1>
      <Card className=" bg-[#0d1f3c] rounded-none">
        <Form className="flex w-2xl flex-col gap-8" onSubmit={onSubmit}>
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
            <Label className="text-white">Email</Label>
            <Input className="rounded-none" placeholder="Enter your email" />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={6} name="password" type="password">
            <Label className="text-white">Password</Label>
            <Input className="rounded-none" placeholder="Enter your password" />
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit" className="bg-white text-[#0d1f3c]">
              <BiCheck />
              Login
            </Button>
            <Button onClick={signInWithGoogle} type="reset" variant="secondary" className="bg-white text-[#0d1f3c]">
              Continue with Google
            </Button>
          </div>
          <div className="border-t border-gray-200 py-2">
            <p className="text-center text-white font-semibold">
              Don’t have an account? <Link href="/signup">Register</Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
