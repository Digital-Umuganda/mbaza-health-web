import React from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';

import logo from '@/assets/logo/logo.svg';
import Secure from '@/helpers/secureLS';
import { linguistNavLinks } from '@/constants/navigation';
import { HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/features/auth/auth.thunk';
import { roleToPath } from '@/helpers/isAuth';

const LinguistRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sidebar = React.useRef<HTMLDivElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const [toggleSidebar, setToggleSidebar] = React.useState(false);
  const { name, email, phone_number, address, role } =
    Secure.getProfile() || {};

  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !toggleSidebar ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setToggleSidebar(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [toggleSidebar]);

  if (!name || !role) {
    return <Navigate to="/" replace={true} />;
  }

  const onToggle = () => {
    setToggleSidebar(prev => !prev);
  };

  const onLogout = () => {
    onToggle();
    dispatch(logout());
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-1 md:py-0 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                ref={trigger}
                type="button"
                onClick={onToggle}
                className="inline-flex items-center p-2 focus:text-slate-600 text-sm text-slate-600 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <img
                  src={logo}
                  className="h-8 mr-3 pointer-events-none"
                  alt="BAZA Logo"
                />
                <span className="sr-only self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  RBC-Mbaza
                </span>
              </Link>
            </div>
            <div className="hidden sm:flex items-center space-x-10">
              {linguistNavLinks.map(link => (
                <NavLink
                  key={link.label}
                  to={`/${roleToPath(role)}${link.path}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'text-blue-500 font-semibold border-green-500'
                        : 'text-slate-600 border-transparent hover:text-slate-700 hover:border-slate-300'
                    } flex items-center py-3 border-b-2`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="flex md:order-2 space-x-2 md:space-x-4 items-center">
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar rounded />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{name}</span>
                  <span className="block text-xs text-gray-400">
                    {role}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {email || phone_number || address}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/${roleToPath(role)}/profile`)
                  }
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        ref={sidebar}
        className={`${
          toggleSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:hidden md:translate-x-0 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-300 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium pb-4">
            {linguistNavLinks.map(link => (
              <li key={link.label}>
                <NavLink
                  to={`/${roleToPath(role)}${link.path}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'group text-blue-500 font-semibold bg-blue-500/10'
                        : 'text-slate-600 hover:bg-gray-100'
                    } flex items-center p-3`
                  }
                  onClick={onToggle}
                >
                  <link.icon
                    size={24}
                    className="group-active:text-amber-400 flex-shrink-0 w-6 h-6 transition duration-75"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="pt-4 mt-auto space-y-2 font-medium border-t border-gray-200 dark:border-gray-700 flex flex-col">
            <li>
              <NavLink
                to={`/${roleToPath(role)}/profile`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'group text-blue-500 font-semibold bg-blue-500/10'
                      : 'text-slate-600 hover:bg-gray-100'
                  } flex items-center p-3`
                }
                onClick={onToggle}
              >
                <HiOutlineCog
                  size={24}
                  className="flex-shrink-0 w-6 h-6 transition duration-75"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  My Profile
                </span>
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={onLogout}
                className="text-slate-600 hover:bg-gray-100 flex items-center p-3 w-full text-left"
              >
                <HiOutlineLogout
                  size={24}
                  className="rotate-180 flex-shrink-0 w-6 h-6 transition duration-75"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 py-20 flex flex-col bg-gray-100 flex-grow">
        <div className="flex flex-col max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LinguistRoute;
