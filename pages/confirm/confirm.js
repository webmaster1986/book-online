app.controller('confirmCtrl', function($scope, $localStorage) {
    
    $scope.$storage = $localStorage;
    $scope.flights  = false;
    $scope.terms    = false;
    $scope.custCheckInDate = new Date ($scope.$storage.arrivalDate);
    $scope.custCheckOutDate = new Date ($scope.$storage.departureDate);
    
    $scope.confirmBtnDisable = true;
    $scope.confirmBtnDisable = ($scope.flights && $scope.terms)? false : true;
    
    
});