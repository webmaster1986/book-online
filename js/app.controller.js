// JavaScript Document
(function(){
    app.controller('appCtrl', function($rootScope, $filter, $scope, $state, $stateParams, $timeout, $localStorage)
    {
        $scope.$storage         = $localStorage;
        $scope.$storage.page    = {};
        $scope.$storage.webKey  = '6d4f9219-c2bc-4494-9f8f-7e778ce30732';
        $localStorage           = $scope.$storage;
    });
})();
