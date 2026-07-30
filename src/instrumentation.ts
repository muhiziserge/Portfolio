export async function onRequestError(
  error: unknown,
  request: { path: string; method: string },
) {
  const { track } = await import("@vercel/analytics/server");
  const message = error instanceof Error ? error.message : String(error);

  await track("Error", {
    message,
    path: request.path,
    method: request.method,
    scope: "server",
  });
}
