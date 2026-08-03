import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login | MD. MASUDUL HASAN",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">Sign in to manage your portfolio</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
