import logo from '@/assets/logo/logo.svg';
import { NavLink, Outlet } from 'react-router-dom';
import imigongo from '@/assets/images/imigongo.png';

const AuthRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-blue-500 min-h-screen w-full p-8">
      <div className="flex flex-col w-full sm:max-w-[426px] bg-white rounded-2xl p-10 md:p-12">
        <img
          src={logo}
          alt="RBC-BAZA"
          className="h-16 mx-auto mt-8 pointer-events-none"
        />

        <h1 className="mt-8 text-blue-500 text-center text-4xl font-normal font-['Inter']">
          Welcome!
        </h1>

        <p className="mt-4 text-slate-600 text-center text-base font-normal font-['Inter']">
          Login to continue
        </p>

        <Outlet />

        <NavLink to="/forget-password" className="text-center mt-6">
          <span className="text-slate-600 text-sm font-bold font-['Inter'] underline uppercase">
            Forgot
          </span>
          <span className="text-slate-600 text-sm font-bold font-['Inter'] uppercase">
            {' '}
            Password?
          </span>
        </NavLink>
      </div>
      <img
        src={imigongo}
        alt=""
        className="h-[17px] pointer-events-none w-full sm:max-w-[426px] -translate-y-[17px]"
      />
    </div>
  );
};

export default AuthRoute;
