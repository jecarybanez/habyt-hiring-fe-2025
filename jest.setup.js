import { TextEncoder, TextDecoder } from 'node:util';
import { Request, Response, Headers, fetch } from 'undici';

// Polyfill Web APIs
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill Fetch API and Web Request/Response
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.fetch = fetch;

// Add this for Next.js specific globals
if (!global.URLPattern) {
  global.URLPattern = await import('urlpattern-polyfill').then(mod => mod.URLPattern);
}

// Add jest-dom for component tests
import '@testing-library/jest-dom';