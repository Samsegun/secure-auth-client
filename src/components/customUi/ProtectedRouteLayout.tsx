import { NavLink, Outlet } from "react-router";

function ProtectedRouteLayout() {
    return (
        <div>
            <nav className='bg-[#32bc9c7b] px-4 py-3'>
                <div
                    className='flex items-center justify-between
             max-w-7xl mx-auto'>
                    {/* logo */}
                    <NavLink to={"/home"} className='flex items-center'>
                        <img
                            src='/lock.png'
                            alt='Logo'
                            className='h-8 w-auto'
                        />
                        <span>Secure-Auth</span>
                    </NavLink>

                    {/* nav items */}
                    <ul className='flex gap-4 items-center'>
                        <li>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to='/users'>Users</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default ProtectedRouteLayout;
