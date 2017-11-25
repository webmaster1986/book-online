app.controller('personalCtrl', function($scope, $localStorage, $state) {

    $scope.$storage = $localStorage;

    console.log($scope.$storage);
});