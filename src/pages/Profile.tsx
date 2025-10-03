import ErrorFallback from "@/components/customUi/ErrorFallback";
import ErrorIcon from "@/components/customUi/ErrorIcon";
import LoadingIcon from "@/components/customUi/LoadingIcon";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { useProfile } from "@/hooks/useUser";

function Profile() {
    const { data: userProfile, isLoading, isError, error } = useProfile();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (isError) {
        if ((error as any)?.response?.status >= 500) {
            return (
                <ErrorFallback
                    error={
                        new Error(
                            "The server is currently unavailable. Please try again later."
                        )
                    }
                    resetErrorBoundary={() => window.location.reload()}
                />
            );
        }

        return <ErrorIcon error={error} />;
    }

    const user = userProfile?.data.data.user!;

    return (
        <PageWrapper>
            <PageHeader>Profile page</PageHeader>

            <section className='mt-8'>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
            </section>
        </PageWrapper>
    );
}

export default Profile;
