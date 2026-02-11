export const onRequest = async (context: any) => {
  const { request } = context;
  const url = new URL(request.url);

  const allowedOrigins = ["https://gim.mbrinkl.dev"];

  const origin = request.headers.get("origin");

  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response("Forbidden", { status: 403 });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing ?url= parameter", { status: 400 });
  }

  if (isPrivateOrLocal(targetUrl)) {
    return new Response("Blocked target", { status: 403 });
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: filterHeaders(request.headers),
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
      redirect: "follow",
    });

    const newHeaders = new Headers(response.headers);

    // Apply CORS headers
    Object.entries(corsHeaders(origin)).forEach(([key, value]) => newHeaders.set(key, value as string));

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch {
    return new Response("Proxy error", { status: 500 });
  }
};

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

function filterHeaders(headers: Headers) {
  const newHeaders = new Headers();
  const allowed = ["content-type", "authorization"];

  headers.forEach((value, key) => {
    if (allowed.includes(key.toLowerCase())) {
      newHeaders.set(key, value);
    }
  });

  return newHeaders;
}

function isPrivateOrLocal(targetUrl: string) {
  try {
    const parsed = new URL(targetUrl);
    const hostname = parsed.hostname;

    return (
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("172.16.")
    );
  } catch {
    return true;
  }
}
