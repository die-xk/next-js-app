type ApiError = {
  message: string;
  status?: number;
  code?: string;
}

type UnknownError = Error | ApiError | unknown; 