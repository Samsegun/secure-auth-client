import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PageWrapper from "@/components/customUi/PageWrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router";
import FormWrapper from "./components/customUi/FormWrapper";
import OAuthButtons from "./components/customUi/OAuthButtons";
import PageHeader from "./components/customUi/PageHeader";
import { useSignin } from "./hooks/useAuth";
import { signinFormSchema } from "./utils/FormUtils";

function Signin() {
    const [searchParams, setSearchParams] = useSearchParams();
    const signinMutation = useSignin();

    // this hanles oauth errors
    useEffect(() => {
        const error = searchParams.get("error");

        if (error === "oauth_failed") {
            toast.error(
                "Google sign-in failed. Please try again or use email/password."
            );

            // clean up url by removing the error parameter
            searchParams.delete("error");
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const form = useForm<z.infer<typeof signinFormSchema>>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signinFormSchema>) {
        const { email, password } = values;

        signinMutation.mutate({ email, password });
    }

    return (
        <PageWrapper>
            <PageHeader>Sign In</PageHeader>

            <FormWrapper>
                <OAuthButtons />

                <Form {...form}>
                    {signinMutation.isError && (
                        <p className='text-red-500 my-4 text-center capitalize'>
                            {signinMutation.error.message}!
                        </p>
                    )}

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 w-full md:w-[450px]'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='xyz@mail.com'
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Password'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={signinMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] 
                            block w-full'>
                            {signinMutation.isPending
                                ? "Signing in..."
                                : "Sign In"}
                        </Button>

                        <p className='flex flex-col items-center'>
                            <span>Don't have an account?</span>
                            <Link
                                to={"/signup"}
                                className='text-[#32bc9c7b] underline font-bold'>
                                Create new account
                            </Link>
                        </p>
                    </form>
                </Form>
            </FormWrapper>
        </PageWrapper>
    );
}

export default Signin;
