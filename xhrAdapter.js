export function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            config: config,
            data: xhr.responseText,
            headers: xhr.getAllResponseHeaders(),
            request: xhr,
            status: xhr.status,
            statusText: xhr.statusText
          });
        } else {
          reject(new Error('请求失败 失败的状态码为' + xhr.status));
        }
      }
    }
    if (config.cancelToken) {
      config.cancelToken.promise.then(value => {
        xhr.abort();
        reject(new Error('请求已经被取消'))
      });
    }
  });
}
