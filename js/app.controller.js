// JavaScript Document
(function(){
    app.controller('appCtrl', function($rootScope, $filter, $scope, $state, $stateParams, $timeout, $localStorage, $api)
    {
        $scope.$storage         = $localStorage;
        $scope.$storage.page    = {};
        $scope.$storage.webKey  = '6d4f9219-c2bc-4494-9f8f-7e778ce30732';
        $localStorage           = $scope.$storage;


      var getBookingDateEvent = $rootScope.$on('getBookingDate', function (event, id, callback) {
        $scope.isLoading = true;
        $api.get('/BookingDate?format=json', $scope.$storage.webKey).then(successCallback, errorCallback);
        function successCallback(response){
            $localStorage.bookDate = response.data.data[0].date;
          if(typeof callback == 'function') callback(response.data.data[0].date);
        }
        function errorCallback(response){
            console.log(response)
        }
      });
    });
})();
