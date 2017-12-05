app.controller('homeCtrl', function ($scope, $localStorage, $state, API_URL, $http, $api, $rootScope) {

  $scope.$storage = $localStorage;
  $scope.bothDate = false;

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthNames = ["January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"];


  $scope.$on('$viewContentLoaded', function(){
    $scope.$emit('getBookingDate');
  });
  $scope.date = new Date($scope.$storage.bookDate);
  var currentDate = new Date($scope.$storage.bookDate);

  var documentResult = document.getElementsByClassName("three-calendars");
  var element = angular.element(documentResult);

  $scope.firstDate    = $scope.date.getDate();
  $scope.firstDay     = days[$scope.date.getDay()];
  $scope.firstYear    = $scope.date.getFullYear();
  $scope.firstMonth   = monthNames[$scope.date.getMonth()];

  $scope.secondDate   = $scope.date.getDate();
  $scope.secondDay    = days[$scope.date.getDay()];
  $scope.secondYear   = $scope.date.getFullYear();
  $scope.secondMonth  = monthNames[$scope.date.getMonth()];

  $scope.totalAdults = 0;
  $scope.totalChilds = 0;

  pickmeup('.three-calendars', {
    flat: true,
    mode: 'range',
    format	: 'Y-m-d',
    date:[
      $scope.date
    ],
    calendars: 2,
  });

  element[0].addEventListener('pickmeup-change', function (e) {

    $scope.checkInDate = e.detail.formatted_date;

    $scope.firstDate = e.detail.date[0].getDate();
    $scope.firstDay = days[e.detail.date[0].getDay()];
    $scope.firstYear = e.detail.date[0].getFullYear();
    $scope.firstMonth = monthNames[e.detail.date[0].getMonth()];

    $scope.checkOutDate = e.detail.formatted_date;

    $scope.secondDate = e.detail.date[1].getDate();
    $scope.secondDay = days[e.detail.date[1].getDay()];
    $scope.secondYear = e.detail.date[1].getFullYear();
    $scope.secondMonth = monthNames[e.detail.date[1].getMonth()];

    $scope.date = e.detail.formatted_date;
    $scope.$apply();
  });

  $scope.submitHomeForm = function(form) {

    if (angular.isArray($scope.date)) {
      $scope.arrivalDate = $scope.date[0];
      $scope.departureDate = $scope.date[1];
    } else {
      $scope.arrivalDate = $scope.date;
      $scope.departureDate = $scope.date;
    }
    $localStorage.arrivalDate = $scope.arrivalDate;
    $localStorage.departureDate = $scope.departureDate;
    $state.go('suites');
  };
});