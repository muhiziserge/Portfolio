"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import "./globals.css";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <div className="error-panel">
          <h1>Something went wrong</h1>
          <p>The error has been reported. You can try again.</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
