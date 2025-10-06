import FormWrapper from "@/components/customUi/FormWrapper";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/useAuth";
import { resetPasswordSchema } from "@/utils/FormUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import { z } from "zod";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const resetPasswordMutation = useResetPassword();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        const { password } = values;

        if (!token || !email) {
            toast.error("Invalid or missing reset link parameters");
            return;
        }

        resetPasswordMutation.mutate({ token, password, email });
    }

    return (
        <PageWrapper>
            <PageHeader>Reset Password</PageHeader>

            <FormWrapper>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 w-full md:w-[450px]'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter new password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='New password'
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
                            disabled={resetPasswordMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] 
                                                                            block w-full'>
                            {resetPasswordMutation.isPending
                                ? "Resetting..."
                                : "Reset"}
                        </Button>
                    </form>
                </Form>
            </FormWrapper>
        </PageWrapper>
    );
}

export default ResetPassword;
