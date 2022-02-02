export function CancelToken(executor) {
  var resolvePromise;
  this.promise = new Promise((resolve) => {
    resolvePromise = resolve
  });
  executor(() => resolvePromise());
}
