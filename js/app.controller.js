// JavaScript Document
(function(){
    app.controller('appCtrl', function($rootScope, $filter, $scope, $state, $stateParams, $timeout, $localStorage)
    {
        $scope.$storage             = $localStorage;
        $scope.$storage.page        = {};
        if($state.current.name === 'suites'){
            $scope.suitesVisible = false;
        }
        var plus_5_days	= new Date;
        plus_5_days.setDate(plus_5_days.getDate() + 3);

        $('.three-calendars').pickmeup({
            flat		: true,
            mode		: 'range',
            date		: [
                new Date,
                plus_5_days
            ],
            calendars	: $( window ).width()<639 ? 1 : 2
        });

        $scope.gotoPageByRoute = function (route, params) {
            $state.go(route, params || {});
        };
    })
})();
