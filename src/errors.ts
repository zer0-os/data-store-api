export class DataStoreApiError extends Error {
  errorCode: number;
  name: string;
  message: string;

  constructor(message: string, errorCode?: number, name?: string) {
    super();
    this.message = message;
    this.errorCode = errorCode ?? 500;
    this.name = name ?? "DataStoreApi";
  }
}

export class InvalidSortFieldsError extends DataStoreApiError {
  constructor(message: string) {
    super(message, 400, "InvalidSortFieldsError");
  }
}
