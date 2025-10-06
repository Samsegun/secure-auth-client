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
import { useForgotPassword } from "@/hooks/useAuth";
import { forgotPasswordSchema } from "@/utils/FormUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ForgotPassword() {
    const forgotPasswordMutation = useForgotPassword();

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        const { email } = values;

        forgotPasswordMutation.mutate({ email });
    }

    return (
        <PageWrapper>
            <PageHeader>Forgot Password</PageHeader>

            <FormWrapper>
                <Form {...form}>
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

                        <Button
                            type='submit'
                            disabled={forgotPasswordMutation.isPending}
                            className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da] 
                                                                            block w-full'>
                            {forgotPasswordMutation.isPending
                                ? "Submitting..."
                                : "Submit"}
                        </Button>
                    </form>
                </Form>
            </FormWrapper>
        </PageWrapper>
    );
}

export default ForgotPassword;
