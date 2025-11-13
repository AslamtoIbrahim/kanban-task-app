import { Button } from "@/features/auth/components/ui/button";
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
import { Input } from "@/features/auth/components/ui/input";
import { cn } from "@/features/auth/lib/utils";
import { Spinner } from "@/shared/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../auth.service";
import { loginSchema, type LoginFormData } from "../lib/types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/Form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [isLoading, setIsLoadding] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const { data, error, isPending } = authService.useSession();
  const [isGooglePending, setIsGooglePending] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoadding(true);
    setErrors(null);
    await authService.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          setIsLoadding(false);
          setErrors(null);
          navigate("/");
        },
        onError(context) {
          setIsLoadding(false);
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
        callbackURL: "http://localhost:5173",
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

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (data?.user) {
    console.log("msg: ", data?.user);
    navigate("/");
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  <Button type="submit" disabled={isLoading || isGooglePending}>
                    {isLoading && <Spinner />}
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading || isGooglePending}
                    onClick={onGoogleClickHandler}
                  >
                    {isGooglePending && <Spinner />}
                    Login with Google
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
