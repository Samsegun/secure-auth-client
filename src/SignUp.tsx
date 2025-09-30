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
import { useSignup } from "@/hooks/useAuth";
import { Link } from "react-router";
import FormWrapper from "./components/customUi/FormWrapper";
import OAuthButtons from "./components/customUi/OAuthButtons";
import PageHeader from "./components/customUi/PageHeader";
import PasswordRequirements from "./components/customUi/PasswordRequirements";
import { signupFormSchema } from "./utils/FormUtils";

function Signup() {
    const signupMutation = useSignup();

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signupFormSchema>) {
        const { email, password } = values;

        signupMutation.mutate({ email, password });
    }

    return (
        <PageWrapper>
            <PageHeader>Create an account</PageHeader>

            <FormWrapper>
                <OAuthButtons />

                <Form {...form}>
                    {signupMutation.isError && (
                        <p className='text-red-500 my-4 text-center capitalize'>
                            {signupMutation.error.message}!
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
                                    {form.formState.touchedFields.password && (
                                        <PasswordRequirements
                                            password={field.value}
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            disabled={signupMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] 
                            block w-full'>
                            {signupMutation.isPending
                                ? "Creating acccount..."
                                : "Create account"}
                        </Button>

                        <p className='flex flex-col items-center'>
                            <span>Already have an account?</span>
                            <Link
                                to={"/signin"}
                                className='text-[#32bc9c7b] underline font-bold'>
                                Sign In
                            </Link>
                        </p>
                    </form>
                </Form>
            </FormWrapper>
        </PageWrapper>
    );
}

export default Signup;
