var App = angular.module('hello-dashboard', ['ui.router']);
App.provider('AppGlobalData', function () {

  var GlobalData = window._AppGlobalData;

  GlobalData.$get = function () {
    return GlobalData;
  };
  return GlobalData;

});
App.provider('AppUrl', function (AppGlobalDataProvider) {
  var Url = {};
  Url.baseUrl = function (url) {
    return AppGlobalDataProvider.Url.base + url;
  };

  Url.apiUrl = function (url) {
    return AppGlobalDataProvider.Url.api + url;
  };

  Url.$get = function () {
    return Url;
  };

  return Url;

});
App.config(function ($httpProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
});
