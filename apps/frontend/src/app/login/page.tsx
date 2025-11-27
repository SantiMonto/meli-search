import { LoginForm } from '@/components/features/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-start bg-gray-100 pt-12">
      <LoginForm />
    </main>
  );
}
