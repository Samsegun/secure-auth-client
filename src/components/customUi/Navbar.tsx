import { useAuthStatus, useSignout } from "@/hooks/useAuth";
import { NavLink } from "react-router";

function Navbar() {
    const { isModerator, isAdmin, isSuperAdmin } = useAuthStatus();
    const signOutMutation = useSignout();

    return (
        <nav className='bg-[#32bc9c7b] px-4 py-3'>
            <div
                className='flex items-center justify-between
     max-w-7xl mx-auto'>
                {/* logo */}
                <NavLink to={"/home"} className='flex items-center'>
                    <img src='/lock.png' alt='Logo' className='h-8 w-auto' />
                    <span>Secure-Auth</span>
                </NavLink>

                {/* nav items */}
                <ul className='flex gap-4 items-center'>
                    <li>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>

                    {/* admins and mods */}
                    {(isAdmin || isModerator || isSuperAdmin) && (
                        <li>
                            <NavLink to='/users'>Users</NavLink>
                        </li>
                    )}

                    {/* admins only */}
                    {(isAdmin || isSuperAdmin) && (
                        <li>
                            <NavLink to='/settings'>Settings</NavLink>
                        </li>
                    )}

                    <button
                        className='cursor-pointer'
                        onClick={() => signOutMutation.mutate()}>
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
