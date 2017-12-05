app.controller('ratesCtrl', function ($scope, $localStorage, $state, $timeout, $http, API_URL) {

  $timeout(function () {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: 600
    });
  }, 2);
  var documentResult = document.getElementsByClassName("checkIn");
  var checkIn = angular.element(documentResult);

  checkIn[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkInDate = e.detail.formatted_date;
  });

  var documentResult = document.getElementsByClassName("checkOut");
  var checkOut = angular.element(documentResult);

  checkOut[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkOutDate = e.detail.formatted_date;
  });

  pickmeup('.checkIn', {
    position: 'bottom',
    date: [
      new Date($scope.$storage.arrivalDate)
    ],
    hide_on_select: true
  });

  pickmeup('.checkOut', {
    position: 'bottom',
    date: [
      new Date($scope.$storage.departureDate)
    ],
    hide_on_select: true
  });

  $scope.$storage = $localStorage;
  $scope.confirmRoom = false;
  $scope.roomLists = function () {
    $http.get(API_URL + $scope.$storage.webKey + '/rates?format=json&type=standardroom&countrooms=1&occupancy=2,0,0,0,0,0,0&from=' + $scope.$storage.arrivalDate + '&to=' + $scope.$storage.departureDate + '&isocode=en&IncludeBookableRooms=true')
      .then(function (res) {
        $scope.roomList = res.data.data.instances[0].roomTypes;
      }, function () {
        console.log('Error in Fetching Room types');
      });
  };
  $scope.roomLists();

  $localStorage.bookRooms = ($localStorage.bookRooms) ? $localStorage.bookRooms : [];

  $scope.addRoom = function (room) {
    $localStorage.bookRooms.forEach(function (value) {
      if (room.id === value.id) {
        $scope.errorMessage = "Room type is already added in list!";
      } else {
        $localStorage.bookRooms.push(room);
      }
    });

    if (!$localStorage.bookRooms.length) {
      $localStorage.bookRooms.push(room);
    }
  };
  $scope.removeRoom = function (roomId) {
    $localStorage.bookRooms.forEach(function (room, index) {
      if (room.id === roomId) {
        $localStorage.bookRooms.splice(index, 1);
      }
    });
  };
  $scope.getTotalCost = function () {
    var totalCost = 0;
    $localStorage.bookRooms.forEach(function (room) {
      totalCost += parseFloat(room.rates[0].price.formatted);
    });
    return totalCost;
  };

  $scope.makeReservation = function (e) {
    $state.go('personal');
  }

});