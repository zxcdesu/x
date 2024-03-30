export class UrlHelper {
  static ensureLeadingSlash(url: string) {
    return url.startsWith('/') ? url : `/${url}`;
  }

  static ensureTrailingSlash(url: string) {
    return url.endsWith('/') ? url : `${url}/`;
  }
}
