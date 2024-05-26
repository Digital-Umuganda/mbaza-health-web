import logo from '@/assets/logo/logo.svg';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import imigongo from '@/assets/images/imigongo.png';
import { webAuthPaths } from '@/constants/path';
import { useMemo } from 'react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';

const AuthRoute = () => {
  const { pathname } = useLocation();

  const linkItem = useMemo(() => {
    switch (pathname) {
      case webAuthPaths.login:
        return {
          title: 'Welcome!',
          subTitle: 'Login to continue',
          link: webAuthPaths.forgotPassword,
          backLabel: 'Forgot Password?',
        };
      case webAuthPaths.forgotPassword:
        return {
          title: 'Forgot password?',
          subTitle:
            'Provide your email or phone number to reset your password.',
          link: webAuthPaths.login,
          backLabel: 'Login instead',
        };
      case webAuthPaths.resetPassword:
        return {
          title: 'Set new password!',
          subTitle: 'Remember it on your next login',
          link: webAuthPaths.login,
          backLabel: 'Login instead',
        };
      case webAuthPaths.sendTwoFactorCode:
        return {
          title: 'Verify your account!',
          subTitle:
            'Click the button below to send verification code to your email or phone number',
          link: webAuthPaths.login,
          backLabel: 'Login instead',
        };

      case webAuthPaths.verifyTwoFactorCode:
        return {
          title: 'Verify your account!',
          subTitle:
            'Provide the verification code sent to your email or phone number',
          link: webAuthPaths.login,
          backLabel: 'Login instead',
        };

      default:
        return {
          title: 'Welcome!',
          subTitle: 'Login to continue',
          link: webAuthPaths.login,
          backLabel: 'Login instead',
        };
    }
  }, [pathname]);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-500 min-h-screen w-full p-8">
      <div className="flex flex-col w-full sm:max-w-[426px] bg-white rounded-2xl p-10 md:p-12">
        {pathname === webAuthPaths.login && (
          <img
            src={logo}
            alt="RBC-Mbaza"
            className="h-16 mx-auto mt-8 pointer-events-none"
          />
        )}
        {pathname === webAuthPaths.forgotPassword && (
          <HiLockClosed
            size={24}
            className="h-16 mx-auto mt-8 text-amber-400"
          />
        )}
        {pathname === webAuthPaths.resetPassword && (
          <HiLockOpen
            size={24}
            className="h-16 mx-auto mt-8 text-amber-400"
          />
        )}
        <h1 className="mt-8 text-blue-500 text-center text-4xl font-normal font-['Inter']">
          {linkItem.title}
        </h1>
        <p className="mt-4 text-slate-600 text-center text-base font-normal font-['Inter']">
          {linkItem.subTitle}
        </p>

        <Outlet />

        <NavLink
          to={linkItem.link}
          className="text-center mt-6 text-slate-600 text-sm font-bold font-['Inter'] underline uppercase"
        >
          {linkItem.backLabel}
        </NavLink>
      </div>
      <img
        src={imigongo}
        alt=""
        className="h-[17px] pointer-events-none w-full sm:max-w-[426px] -translate-y-[17px]"
      />
      <div className="pt-4 mt-auto opacity-40 text-center text-white text-base font-normal font-['Inter'] leading-normal">
        Powered by Digital Umuganda
      </div>
    </div>
  );
};

export default AuthRoute;
