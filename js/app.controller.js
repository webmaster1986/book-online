// JavaScript Document
(function(){
    app.controller('appCtrl', function($rootScope, $filter, $scope, $state, $stateParams, $timeout, $localStorage)
    {
        $scope.$storage             = $localStorage;
        $scope.$storage.page        = {};
        if($state.current.name === 'suites'){
            $scope.suitesVisible = false;
        }
    });
})();
