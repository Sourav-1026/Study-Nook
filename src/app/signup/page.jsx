"use client";
import React from "react";
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { BiCheck } from "react-icons/bi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    console.log({ data, error });

    if (data) {
      toast.success("Registration successful! Please login.");
      redirect("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold text-center mb-6">User Registration Page</h1>
      <Card className=" bg-[#0d1f3c] rounded-none">
        <Form className="flex w-2xl flex-col gap-8" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label className="text-white">Name</Label>
            <Input className="rounded-none" placeholder="Enter your name" />
            <FieldError />
          </TextField>
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
          <TextField isRequired name="image" type="url">
            <Label className="text-white">ImageUrl</Label>
            <Input className="rounded-none" placeholder="Enter your image url" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-white">Password</Label>
            <Input className="rounded-none" placeholder="Enter your password" />
            <Description className="text-white">Must be at least 6 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button type="submit" className="bg-white text-[#0d1f3c]">
              <BiCheck />
              Submit
            </Button>
            <Button type="reset" variant="secondary" className="bg-white text-[#0d1f3c]">
              Continue with Google
            </Button>
          </div>
          <div className="border-t border-gray-200 py-2">
            <p className="text-center text-white font-semibold">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
