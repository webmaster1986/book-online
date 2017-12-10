app.controller('homeCtrl', function ($scope, $localStorage, $state, API_URL, $http, $api, $rootScope, $filter) {

  $scope.$storage = $localStorage;
  // $scope.$storage.arrivalDate = $filter('date')($scope.$storage.arrivalDate, "yyyy-MM-dd");


  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

  $scope.$on('$viewContentLoaded', function () {
    $scope.$emit('getBookingDate');
  });

  $scope.$storage.bookDate = moment($localStorage.bookDate);
  $scope.checkInDate = ($scope.$storage.arrivalDate) ? moment($scope.$storage.arrivalDate) : $scope.$storage.bookDate;
  $scope.checkOutDate = ($scope.$storage.departureDate) ? moment($scope.$storage.departureDate)  : $scope.$storage.bookDate;

  // $scope.checkOutDate.setDate($scope.checkInDate.getDate() + 1);
  // $scope.checkOutDate = moment($scope.$storage.bookDate).add('1','d');
  if($( window ).width()<639) {
    pickmeup('.checkInPicker', {
      flat: true,
      format: 'd-m-Y',
      default_date: false,
      hide_on_select: true,
      min: $scope.checkInDate.format('D-MM-YYYY'),
      locale: 'en',
      calendars: 1,
    });
  } else {
    pickmeup('.checkInPicker', {
      flat: true,
      format: 'd-m-Y',
      default_date: false,
      min: $scope.checkInDate.format('D-MM-YYYY'),
      locale: 'en',
      calendars: 2,
    });
  }
  if($( window ).width()<639) {
    pickmeup('.checkOutPickerMob', {
      flat: true,
      format: 'd-m-Y',
      default_date: false,
      hide_on_select: true,
      min: $scope.checkInDate.format('D-MM-YYYY'),
      locale: 'en',
      calendars: 1,
    });
  } else {
    pickmeup('.checkOutPicker', {
      flat: true,
      format: 'd-m-Y',
      default_date: false,
      min: $scope.checkInDate.format('D-MM-YYYY'),
      locale: 'en',
      calendars: 2,
    });
  }

  $scope.firstDate = ($scope.checkInDate.date() <= 9) ? '0' + $scope.checkInDate.date() : $scope.checkInDate.date();
  $scope.firstDay = days[$scope.checkInDate.weekday()];
  $scope.firstYear = $scope.checkInDate.year();
  $scope.firstMonth = monthNames[$scope.checkInDate.months()];

  $scope.secondDate = ($scope.checkOutDate.date() <= 9) ? '0' + $scope.checkOutDate.date() : $scope.checkOutDate.date();
  $scope.secondDay = days[$scope.checkOutDate.weekday()];
  $scope.secondYear = $scope.checkOutDate.year();
  $scope.secondMonth = monthNames[$scope.checkOutDate.months()];

  $scope.showCheckInDiv = function () {
    $('.calendar_bottom').css('display', 'none');
    $('.calendar_bottom').toggle();
    $('#checkOutDiv').hide();
    $('#checkInDiv').show();
    $('.departure_data').removeClass('active');
    $('.arrival_data').addClass('active');
  };
  $scope.showCheckOutDiv = function () {
    if($( window ).width()<639) {
      $('.checkOutMobile').css('background-color','#EEECE6');
      $('.calendar_mobile').show();
    } else {
      $('.calendar_bottom').css('display', 'none');
      $('.calendar_bottom').toggle();
      $('#checkInDiv').hide();
      $('#checkOutDiv').show();
      $('.arrival_data').removeClass('active');
      $('.departure_data').addClass('active');
    }
  };

  var checkInPickerResult = document.getElementsByClassName("checkInPicker");
  var elementCheckIn = angular.element(checkInPickerResult);

  var checkOutPickerResult = document.getElementsByClassName("checkOutPicker");
  var elementCheckOut = angular.element(checkOutPickerResult);

  var checkOutPickerMobResult = document.getElementsByClassName("checkOutPickerMob");
  var elementCheckOutPickerMob = angular.element(checkOutPickerMobResult);

  elementCheckIn[0].addEventListener('pickmeup-change', function (e) {
    if($( window ).width()<639) {
      $scope.checkInDate = moment(e.detail.date);
      $scope.firstDate = ($scope.checkInDate.date() <= 9) ? '0' + $scope.checkInDate.date() : $scope.checkInDate.date();
      $scope.firstDay = days[$scope.checkInDate.weekday()];
      $scope.firstYear = $scope.checkInDate.year();
      $scope.firstMonth = monthNames[$scope.checkInDate.months()];
      $scope.$apply();
      $('.calendar_bottom').css('display', 'none');
      $('.arrival_data').removeClass('active');
      $('.departure_data').removeClass('active');
      $('#checkInDiv').hide();
      $('#checkOutDiv').hide();
    } else {
      $scope.checkInDate = moment(e.detail.date);
      $scope.firstDate = ($scope.checkInDate.date() <= 9) ? '0' + $scope.checkInDate.date() : $scope.checkInDate.date();
      $scope.firstDay = days[$scope.checkInDate.weekday()];
      $scope.firstYear = $scope.checkInDate.year();
      $scope.firstMonth = monthNames[$scope.checkInDate.months()];
      $scope.$apply();
      $('.arrival_data').removeClass('active');
      $('.departure_data').addClass('active');
      $('#checkInDiv').hide();
      $('#checkOutDiv').show();
    }
  });

  elementCheckOutPickerMob[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkOutDate = moment(e.detail.date);
    $scope.secondDate   = ($scope.checkOutDate.date() <= 9) ? '0' + $scope.checkOutDate.date() : $scope.checkOutDate.date();
    $scope.secondDay    = days[$scope.checkOutDate.weekday()];
    $scope.secondYear   = $scope.checkOutDate.year();
    $scope.secondMonth  = monthNames[$scope.checkOutDate.months()];
    $scope.$apply();
    $('.checkOutMobile').css('background-color','none');
    $('.calendar_mobile').hide();
  });

  elementCheckOut[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkOutDate = moment(e.detail.date);
    $scope.secondDate   = ($scope.checkOutDate.date() <= 9) ? '0' + $scope.checkOutDate.date() : $scope.checkOutDate.date();
    $scope.secondDay    = days[$scope.checkOutDate.weekday()];
    $scope.secondYear   = $scope.checkOutDate.year();
    $scope.secondMonth  = monthNames[$scope.checkOutDate.months()];
    $scope.$apply();
    $('#checkOutDiv').hide();
    $('.calendar_bottom').css('display', 'none');
    $('.departure_data').removeClass('active');
  });

  $scope.submitHomeForm = function () {
    $localStorage.arrivalDate = $scope.checkInDate;
    $localStorage.departureDate = $scope.checkOutDate;
    $localStorage.bookDate = moment($scope.$storage.bookDate);
    $state.go('suites');
  };
});