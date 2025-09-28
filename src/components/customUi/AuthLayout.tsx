// import { useAuth } from "@/hooks/useAuth";
// import { LoaderCircle } from "lucide-react";
import { Outlet } from "react-router";

function AuthRouteLayout() {
    // const { isLoading, isAuthenticated } = useAuth();

    return <Outlet />;

    // if (isLoading) {
    //     return (
    //         <div className='flex justify-center items-center h-screen'>
    //             <h2>
    //                 <LoaderCircle size={48} className='animate-spin' />
    //             </h2>
    //         </div>
    //     );
    // }

    // return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
}

export default AuthRouteLayout;
