import ErrorIcon from "@/components/customUi/ErrorIcon";
import LoadingIcon from "@/components/customUi/LoadingIcon";
import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import { useUsers } from "@/hooks/useUser";

function ViewUsers() {
    const { data: listOfUsers, isLoading, isError, error } = useUsers();

    if (isLoading) return <LoadingIcon />;

    if (isError) {
        return <ErrorIcon error={error} />;
    }

    const users = listOfUsers?.data.data.users!;

    return (
        <PageWrapper>
            <PageHeader>list of users</PageHeader>

            <section className='mt-8 rounded-xl bg-[#1656477a] p-4'>
                <ul className='space-y-4'>
                    {users.map(user => {
                        return (
                            <li
                                className='flex flex-col gap-2 bg-black rounded-lg p-2'
                                key={user.id}>
                                <span>Email: {user.email}</span>
                                <span>Role: {user.role}</span>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </PageWrapper>
    );
}

export default ViewUsers;
