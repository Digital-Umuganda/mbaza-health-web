import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';

export const adminSidebarNavLinks = [
  {
    label: 'Home',
    path: '/admin/home',
    icon: HiOutlineHome,
  },
  {
    label: 'Accounts',
    path: '/admin/accounts',
    icon: HiOutlineUsers,
  },
];

export const linguistNavLinks = [
  {
    label: 'Home',
    path: '/linguist/home',
    icon: HiOutlineHome,
  },
  {
    label: 'Dashboard',
    path: '/linguist/dashboard',
    icon: MdDashboard,
  },
  {
    label: 'My Account',
    path: '/linguist/profile',
    icon: HiOutlineUsers,
  },
];
