app.controller('homeCtrl', function ($scope, $localStorage, $state, API_URL, $http, $api, $rootScope, $filter) {
    
    $scope.$storage             = $localStorage;
    // $scope.$storage.arrivalDate = $filter('date')($scope.$storage.arrivalDate, "yyyy-MM-dd");
   
    
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];
    
    $scope.$on('$viewContentLoaded', function () {
        $scope.$emit('getBookingDate');
    });
    $scope.$storage.bookDate = moment("2017-12-08");
   
    $scope.checkInDate = ($scope.$storage.arrivalDate) ? new Date($scope.$storage.arrivalDate) : $scope.$storage.bookDate;
    $scope.checkOutDate = ($scope.$storage.departureDate) ? new Date($scope.$storage.arrivalDate) : $scope.$storage.bookDate;
    // $scope.checkOutDate.setDate($scope.checkInDate.getDate() + 1);
    // $scope.checkOutDate = moment($scope.$storage.bookDate).add('1','d');

    pickmeup('.checkInPicker', {
        flat: true,
        format: 'd-m-Y',
        default_date : false,
        min : $scope.checkInDate.format('D-MM-YYYY'),
        locale : 'en',
        calendars: 2,
    });
    pickmeup('.checkOutPicker', {
        flat: true,
        format: 'd-m-Y',
        default_date : false,
        min : $scope.checkInDate.format('D-MM-YYYY'),
        locale : 'en',
        calendars: 2,
    });
    
    $scope.firstDate = ($scope.checkInDate.date() <= 9) ? '0' + $scope.checkInDate.date() : $scope.checkInDate.date();
    // $scope.firstDate = ($scope.checkInDate.getDate() <= 9) ? '0' + $scope.checkInDate.getDate() : $scope.checkInDate.getDate();
    // $scope.firstDay = days[$scope.checkInDate.getDay()];
    // $scope.firstYear = $scope.checkInDate.getFullYear();
    // $scope.firstMonth = monthNames[$scope.checkInDate.getMonth()];
    //
    // $scope.secondDate = ($scope.checkOutDate.getDate() <= 9) ? '0' + $scope.checkOutDate.getDate() : $scope.checkOutDate.getDate();
    // $scope.secondDay = days[$scope.checkOutDate.getDay()];
    // $scope.secondYear = $scope.checkOutDate.getFullYear();
    // $scope.secondMonth = monthNames[$scope.checkOutDate.getMonth()];

    $scope.showCheckInDiv = function () {
      $('.calendar_bottom').css('display','none');
      $('.calendar_bottom').toggle();
      $('#checkOutDiv').hide();
      $('#checkInDiv').show();
      $('.departure_data').removeClass('active');
      $('.arrival_data').addClass('active');
    };
    $scope.showCheckOutDiv = function () {
      $('.calendar_bottom').css('display','none');
      $('.calendar_bottom').toggle();
      $('#checkInDiv').hide();
      $('#checkOutDiv').show();
      $('.arrival_data').removeClass('active');
      $('.departure_data').addClass('active');
    };

    var checkInPickerResult = document.getElementsByClassName("checkInPicker");
    var elementCheckIn = angular.element(checkInPickerResult);

    var checkOutPickerResult = document.getElementsByClassName("checkOutPicker");
    var elementCheckOut = angular.element(checkOutPickerResult);

    elementCheckIn[0].addEventListener('pickmeup-change', function (e) {
      $scope.checkInDate = moment(e.detail.formatted_date);
      $scope.checkInDate = e.detail.date;
      $scope.firstDate = ($scope.checkInDate.getDate() <= 9) ? '0' + $scope.checkInDate.getDate() : $scope.checkInDate.getDate();
      $scope.firstDay = days[$scope.checkInDate.getDay()];
      $scope.firstYear = $scope.checkInDate.getFullYear();
      $scope.firstMonth = monthNames[$scope.checkInDate.getMonth()];
      $scope.$apply();
      $('.arrival_data').removeClass('active');
      $('.departure_data').addClass('active');
      $('#checkInDiv').hide();
      $('#checkOutDiv').show();
    });

    elementCheckOut[0].addEventListener('pickmeup-change', function (e) {
      $scope.checkOutDate = e.detail.date;
      $scope.secondDate = ($scope.checkOutDate.getDate() <= 9) ? '0' + $scope.checkOutDate.getDate() : $scope.checkOutDate.getDate();
      $scope.secondDay = days[$scope.checkOutDate.getDay()];
      $scope.secondYear = $scope.checkOutDate.getFullYear();
      $scope.secondMonth = monthNames[$scope.checkOutDate.getMonth()];
      $scope.$apply();
      $('#checkOutDiv').hide();
      $('.calendar_bottom').css('display','none');
      $('.departure_data').removeClass('active');
    });

    $scope.submitHomeForm = function () {
        $localStorage.arrivalDate = $scope.checkInDate;
        $localStorage.departureDate = $scope.checkOutDate;
        $state.go('suites');
    };
});