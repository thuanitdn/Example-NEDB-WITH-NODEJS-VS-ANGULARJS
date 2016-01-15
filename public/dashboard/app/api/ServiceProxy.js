App.factory('ServiceProxy', function ($http, $q, AppUrl) {
  return {
    create: createProxy
  };

  function createProxy(proxyConfig) {
    var proxy = {};

    for (var methodName in proxyConfig) {
      addServiceProxyMethod(proxy, methodName, proxyConfig[methodName]);
    }

    return proxy;
  }

  function addServiceProxyMethod(proxy, methodName, methodConfig) {
    var methodConfig = methodConfig.split(/\s+/);

    var httpMethod = methodConfig[0];
    var httpUrl = methodConfig[1];

    httpUrl = AppUrl.apiUrl(httpUrl);

    proxy[methodName] = function (data, opts) {
      return doRequest(httpMethod, httpUrl, data, opts);
    }
  }

  function doRequest(method, url, data, opts) {
    var deferred = $q.defer();

    var options = {
      method: method,
      url: url
    };

    if (method == 'GET') {
      options.params = data;
    } else {
      options.data = data;
    }

    if (opts) {
      options._opts = opts;
    }

    $http(options)
      .success(function (data, status, headers, config) {
        if (data.success) {
          deferred.resolve(data);
        } else {
          deferred.reject({
            success: false,
            messageInfo: data && data.messageInfo,
            data: data,
            status: status,
            headers: headers,
            config: config
          })
        }
      })
      .error(function (data, status, headers, config) {
        deferred.reject({
          success: false,
          messageInfo: data && data.messageInfo,
          data: data,
          status: status,
          headers: headers,
          config: config
        })
      });

    return deferred.promise;
  }

});


App.factory('HttpInterceptor', function ($rootScope, $q) {
  var requestCount = 0;
  return {
    request: function (config) {
      var opts = config._opts;
      requestCount++;
      if (!opts || opts.loading !== false) {
        $rootScope.$broadcast('loading:show');
      }

      return config || $q.when(config);
    },
    response: function (response) {
      requestCount--;
      if (requestCount == 0) {
        $rootScope.$broadcast('loading:hide');
      }

      return response || $q.when(response);
    },
    responseError: function (response) {
      requestCount--;
      if (requestCount == 0) {
        $rootScope.$broadcast('loading:hide');
      }

      return $q.reject(response);
    }
  };
});
