export function getHttpError(status: number): string {
  if (status === 0) {
    return 'No connection';
  } else if (status >= 400 && status < 500) {
    return 'Error of request';
  } else if (status >= 500 && status < 600) {
    return 'Service unavailable';
  } else {
    return 'Unexpected';
  }
}
