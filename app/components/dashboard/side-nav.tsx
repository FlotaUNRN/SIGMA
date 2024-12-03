import UserInfo from '@/app/components/user/user-info';
import SignoutButton from '@/app/components/user/signout-button';
import ToggleTheme from '../toggle-theme';
import NavLinks from '../nav-links';

export default function SideNav() {
  return (
    <div className="sticky top-0 z-50 flex flex-col justify-between bg-lightPaper dark:bg-darkPaper md:h-screen md:min-w-72">
      <div>
        <div className="flex flex-row items-center justify-between m-2">
          <div className="flex flex-col items-center justify-center gap-2 p-1">
            <div className="flex flex-col items-center justify-center">
              <span className="text-s text-center font-bold ">
                UNRN - SEDE ANDINA
              </span>
              <h2 className="text-center text-2xl font-bold text-primary">
                SIGMA
              </h2>
            </div>
          </div>
          <ToggleTheme />
        </div>
        <UserInfo className='m-3 text-center'/>
      </div>
      <div className="flex w-full items-center justify-around md:hidden ">
        <NavLinks />
        <SignoutButton />
      </div>
      <div className="hidden md:flex md:h-full md:flex-col md:justify-between">
        <div><NavLinks /></div>
        <SignoutButton />
      </div>
    </div>
  );
}
