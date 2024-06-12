import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-2/4">
        <div className="flex justify-center">
          <img className="h-auto max-w-[150px]" src="/icons/Warning.png" />
        </div>
        <h1 className="text-3xl mb-4 text-center">Page not found</h1>
        <p className="text-lg text-center mb-8">
          We apologize, but the page you're looking for seems to be missing.
          Please contact support for further assistance. Thank you for your
          understanding.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="mt-1 bg-black text-white py-2 px-5 rounded-3xl"
          >
            Go back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
