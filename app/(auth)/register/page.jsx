import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "../../../components/auth/register/RegisterForm";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-[480px] space-y-6">
        <Image
          src="/rakamin-logo.svg"
          alt="Rakamin Logo"
          width={150}
          height={50}
          className="w-[120px] sm:w-[150px]"
        />

        <Card className="w-full p-6 sm:p-10 shadow-md rounded-[12px]">
          <CardHeader>
            <CardTitle className="font-bold text-xl leading-7">
              Daftar di Rakamin
            </CardTitle>
          </CardHeader>

          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
