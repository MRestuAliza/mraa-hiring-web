import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "../../../components/auth/login/LoginForm";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-[480px] space-y-6">
        <Image
          src="/rakamin-logo.svg"
          alt="Rakamin Logo"
          width={150}
          height={50}
          className="mw-[120px] sm:w-[150px]"
        />

        <Card className="w-full p-6 sm:p-10 shadow-md rounded-[12px]">
          <CardHeader>
            <CardTitle className="font-bold text-xl leading-7">
              Masuk ke Rakamin
            </CardTitle>
            <p className="text-sm text-slate-600">
              Belum mempunyai akun?{" "}
              <a
                href="/register"
                className="text-[#3a959f] hover:underline font-medium"
              >
                Daftar di sini
              </a>
            </p>
          </CardHeader>

          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
