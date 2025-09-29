import { NavLink } from "react-router";

function Unauthorized() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-2xl font-bold mb-4'>Access Denied</h1>
            <p className='text-gray-600'>
                You don't have permission to access this page.
            </p>
            <NavLink
                to='/home'
                className='mt-4 text-[#32bc9c7b] hover:underline'>
                Return to Home
            </NavLink>
        </div>
    );
}

export default Unauthorized;
