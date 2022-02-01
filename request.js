import { dispatchRequest } from './dispatchRequest.js'
export function request(config) {
  let promise = Promise.resolve(config);
  let chains = [dispatchRequest, undefined];
  let result = promise.then(chains[0], chains[1])
  return result;
}
