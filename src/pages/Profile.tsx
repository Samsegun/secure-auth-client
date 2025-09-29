import ErrorIcon from "@/components/customUi/ErrorIcon";
import LoadingIcon from "@/components/customUi/LoadingIcon";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { useProfile } from "@/hooks/useUser";

function Profile() {
    const { data, isLoading, isError, error } = useProfile();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (isError) {
        return <ErrorIcon error={error} />;
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

export default Profile;
