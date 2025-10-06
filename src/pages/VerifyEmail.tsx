import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const verifyEmailMutation = useVerifyEmail();

    const token = searchParams.get("token");

    function verifyEmail() {
        if (!token) {
            toast.error("Invalid or missing verification details parameters");
            return;
        }

        verifyEmailMutation.mutate({ token });
    }

    return (
        <PageWrapper>
            <PageHeader>
                <span>Verify Email</span>{" "}
                {/* <span className='bg-[#32bc9c7b] rounded-full ml-2'>
                <Check />
            </span> */}
            </PageHeader>

            <section className='flex justify-center mt-10'>
                <Button
                    className='bg-[#32bc9c7b] cursor-pointer hover:bg-[#325149da]'
                    disabled={verifyEmailMutation.isPending}
                    onClick={verifyEmail}>
                    {verifyEmailMutation.isPending
                        ? "Verifying Email..."
                        : "Click here to verify your Email"}
                </Button>
            </section>
        </PageWrapper>
    );
}

export default VerifyEmail;
