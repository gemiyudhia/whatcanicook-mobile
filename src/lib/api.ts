const REQUEST_TIMEOUT_MS = 8000;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export type HealthResponse = {
  status: 'ok';
};

function getBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) {
    throw new ApiError(
      0,
      'CONFIG_ERROR',
      'EXPO_PUBLIC_API_URL is not set. Copy .env.example to .env and restart Expo.',
    );
  }
  return url.replace(/\/+$/, '');
}

function toApiError(status: number, body: unknown): ApiError {
  const error = (
    body as { error?: { code?: unknown; message?: unknown } } | null
  )?.error;
  const code = typeof error?.code === 'string' ? error.code : 'UNKNOWN_ERROR';
  const message =
    typeof error?.message === 'string'
      ? error.message
      : `Request failed with status ${status}.`;
  return new ApiError(status, code, message);
}

function toNetworkError(error: unknown): ApiError {
  if (error instanceof Error && error.name === 'AbortError') {
    return new ApiError(0, 'TIMEOUT', 'The request timed out.');
  }
  return new ApiError(
    0,
    'NETWORK_ERROR',
    'Cannot reach the server. Check your network and the API address.',
  );
}

async function request<T>(path: string): Promise<T> {
  const baseUrl = getBaseUrl();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    let response: Response;
    try {
      response = await fetch(`${baseUrl}${path}`, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
    } catch (error) {
      throw toNetworkError(error);
    }

    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      throw toApiError(response.status, body);
    }
    return body as T;
  } finally {
    clearTimeout(timer);
  }
}

export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/api/v1/health');
}
