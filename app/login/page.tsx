import { Metadata } from 'next';
import LoginForm from '@/app/components/login/login-form';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
