"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import "./globals.css";

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
      <body>
        <div className="error-panel">
          <h1>Something went wrong</h1>
          <p>The error has been reported. You can try again.</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
