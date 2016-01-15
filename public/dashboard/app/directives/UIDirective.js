App.directive('loading', function ($rootScope) {
    return {
        restrict: 'AE',
        template: '<div class="spinner"><div class="loader"><div class="loader--dot"></div><div class="loader--dot"></div><div class="loader--dot"></div> <div class="loader--dot"></div> <div class="loader--dot"></div> <div class="loader--dot"></div> <div class="loader--text"></div> </div></div>',
        link: function (scope, element) {
            var $elm = $(element).find('.spinner');
            $rootScope.$on('loading:show', function () {
                $elm.addClass('active');
            });
            $rootScope.$on('loading:hide', function () {
                $elm.removeClass('active');
            });
        }
    }

});
