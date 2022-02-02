import { xhrAdapter } from './xhrAdapter.js'
export function dispatchRequest(config) {
  return xhrAdapter(config).then(response => {
    return response;
  }, error => {
    throw error;
  });
}
