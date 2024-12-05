import SignoutButton from './user/signout-button';
import { auth } from '@/auth';
import NavBar from './nav-bar';

const Header = async () => {
  const session = await auth();

  return (
    <header className="my-3 flex w-full items-center justify-between">
      {session ? <SignoutButton /> : <NavBar />}
    </header>
  );
};

export default Header;
