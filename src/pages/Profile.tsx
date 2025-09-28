import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { useProfile } from "@/hooks/useUser";
import { Ban, LoaderIcon } from "lucide-react";

function Profile() {
    const { data, isLoading, isError, error } = useProfile();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center mt-8'>
                <LoaderIcon size={48} className='animate-spin' />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex flex-col justify-center items-center mt-8'>
                <h2 className='flex flex-col items-center gap-2 text-red-500'>
                    <Ban size={48} />

                    <p className='capitalize'>{error?.message}</p>
                </h2>
            </div>
        );
    }

    return (
        <PageWrapper>
            <PageHeader>profile page</PageHeader>

            <section className='mt-8'>
                <p>{data?.data.data.user.email}</p>
                <p>{data?.data.data.user.id}</p>
            </section>
        </PageWrapper>
    );
}

// res.status(200).json({
//     success: true,
//     message: "Tokens refreshed successfully",
// });

export default Profile;
