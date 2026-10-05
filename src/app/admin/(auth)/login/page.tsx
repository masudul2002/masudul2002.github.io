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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-primary/30 p-2 mb-4 shadow-[0_0_25px_rgba(0,242,255,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192.png" alt="MH Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-text">Admin Login</h1>
          <p className="text-gray-400 mt-2">Sign in to manage your portfolio</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
