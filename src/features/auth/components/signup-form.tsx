import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/auth/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/features/auth/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../auth.service";
import { sinupSchema, type SignupFormData } from "../lib/types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(sinupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsPending(true);
    setErrors(null);
    await authService.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          setIsPending(false);
          setErrors(null);
          navigate("/login");
        },
        onError(context) {
          setIsPending(false);
          setErrors(context.error.message);
        },
      }
    );
  };

  const onGoogleClickHandler = async () => {
    setIsGooglePending(true);
    setErrors(null);
    await authService.signIn.social(
      {
        provider: "google",
        // callbackURL: "http://localhost:5173",
        callbackURL: "https://dancing-longma-3d3bef.netlify.app",
      },
      {
        onSuccess() {
          setIsGooglePending(false);
          setErrors(null);
        },
        onError(context) {
          setIsGooglePending(false);
          setErrors(context.error.message);
        },
      }
    );
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Email</FieldLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Password</FieldLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errors && <p className="text-sm text-red-500">{errors}</p>}

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isPending || isGooglePending}>
                  {isPending && <Spinner />}
                  Create Account
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isPending || isGooglePending}
                  onClick={onGoogleClickHandler}
                >
                  {isGooglePending && <Spinner />}
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
