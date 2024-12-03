import { auth } from '@/auth';

const UserInfo = async ({className}: { className?: string }) => {
  const session = await auth();
  if (!session) return null;
  return (
    <p className={className}>Bienvenido, {session?.user?.name}!</p>
  );
};

export default UserInfo;