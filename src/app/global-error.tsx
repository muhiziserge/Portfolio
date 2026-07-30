"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    track("Error", {
      message: error.message,
      digest: error.digest ?? "",
      scope: "global",
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-gray-500">
          The error has been reported. You can try again.
        </p>
        <button
          onClick={reset}
          className="rounded-full border border-black/10 px-4 py-2 text-sm hover:bg-black/5"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
