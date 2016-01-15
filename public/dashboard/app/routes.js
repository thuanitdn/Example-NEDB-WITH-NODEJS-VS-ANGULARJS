App.config(function ($stateProvider, $urlRouterProvider, AppUrlProvider) {
  var baseUrl = AppUrlProvider.baseUrl;
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('dashboard', {
      views: {
        '@': {
          controller: 'DashboardController',
           templateUrl: baseUrl('tmpl/dashboard.html')
        },
        'area-left@dashboard': {
           templateUrl: baseUrl('tmpl/area-left/area-left.html')  
        },
          'area-top@dashboard': {
              templateUrl: baseUrl('tmpl/area-top/area-top.html')
          }
      }
    })
    .state('dashboard.index', {
        controller:'TaskController',
      url: '/',
      templateUrl: baseUrl('tmpl/area-main/task.html')
    })
});
