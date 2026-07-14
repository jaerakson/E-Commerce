const BASE = "";

export async function api<T>(
  path: string,
  options?: RequestInit,
): Promise<{ ok: true; data: T; meta?: Record<string, unknown> } | { ok: false; error: string }> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  const json = await res.json();
  return json;
}

export function get<T>(path: string) {
  return api<T>(path);
}

export function post<T>(path: string, body: unknown) {
  return api<T>(path, { method: "POST", body: JSON.stringify(body) });
}

export function patch<T>(path: string, body: unknown) {
  return api<T>(path, { method: "PATCH", body: JSON.stringify(body) });
}

export function del<T = void>(path: string) {
  return api<T>(path, { method: "DELETE" });
}
