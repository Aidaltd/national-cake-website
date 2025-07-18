import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-white relative isolate overflow-hidden">
      {/* top & bottom green borders */}
      <span className="absolute inset-x-0 top-0 h-[2px] bg-custom-primary" />
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-custom-primary" />

      <div className="w-full max-w-lg text-center space-y-6">
        <Image
          src="/404.png"
          alt="404 graphic"
          width={300}
          height={200}
          priority
          className="mx-auto w-40 sm:w-56 md:w-64 h-auto"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          The page you were looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <Button className="mx-auto px-8" asChild>
          <Link href="/">Go To Home Page</Link>
        </Button>
      </div>
    </main>
  );
}
