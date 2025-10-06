import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { Check } from "lucide-react";

function VerificationEmailSent() {
    return (
        <PageWrapper>
            <PageHeader>
                <span> Email Verification sent</span>{" "}
                <span className='bg-[#32bc9c7b] rounded-full ml-2'>
                    <Check />
                </span>
            </PageHeader>

            <section className='mt-8 flex justify-center items-center text-xl text-center h-[50vh]'>
                <h2>
                    A verification mail has been sent. Please check your email
                    or spam box.
                </h2>
            </section>
        </PageWrapper>
    );
}

export default VerificationEmailSent;
