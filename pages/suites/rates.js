app.controller('ratesCtrl', function ($scope, $localStorage, $state, $timeout, $http, API_URL, $filter) {

  $scope.$storage = $localStorage;
  $scope.confirmRoom = false;

  $timeout(function () {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: 600
    });
  }, 2);


  $scope.roomLists = function () {
    $http.get(API_URL + $scope.$storage.webKey + '/rates?format=json&type=standardroom&countrooms=1&occupancy=2,0,0,0,0,0,0&from=' + $scope.$storage.arrivalDate + '&to=' + $scope.$storage.departureDate + '&isocode=en&IncludeBookableRooms=true')
      .then(function (res) {
        $localStorage.hotelInformation = res.data.data.instances[0];
        $scope.roomList = res.data.data.instances[0].roomTypes;
      }, function () {
        console.log('Error in Fetching Room types');
      });
  };


  var checkInResult = document.getElementsByClassName("checkIn");
  var checkIn = angular.element(checkInResult);

  checkIn[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkInDate = e.detail.formatted_date;
    if ($scope.checkInDate - $localStorage.arrivalDate !== 0) {
      $scope.$storage.arrivalDate = e.detail.formatted_date;
      $localStorage.arrivalDate = e.detail.date;
      $scope.roomLists();
    }
  });

  var checkOutResult = document.getElementsByClassName("checkOut");
  var checkOut = angular.element(checkOutResult);

  checkOut[0].addEventListener('pickmeup-change', function (e) {
    $scope.checkOutDate = e.detail.formatted_date;
    if ($scope.checkOutDate !== $localStorage.departureDate) {
      $scope.$storage.departureDate = e.detail.formatted_date;
      $localStorage.departureDate = e.detail.date;
      $scope.roomLists();
    }
  });



  pickmeup('.checkIn', {
    position: 'bottom',
    min: new Date(),
    date:[
      new Date($scope.$storage.arrivalDate)
    ],
    hide_on_select: true
  });

  pickmeup('.checkOut', {
    position: 'bottom',
    min: new Date(),
    date:[
      $scope.$storage.departureDate
    ],
    hide_on_select: true
  });


  $scope.roomLists();

  $localStorage.bookRooms = ($localStorage.bookRooms) ? $localStorage.bookRooms : [];

  $scope.addRoom = function (room) {
    $scope.duplicate = $filter('filter')($localStorage.bookRooms, {id: room.id}, true);

    if ($scope.duplicate.length === 0) {
      $localStorage.bookRooms.push(room);
    }
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
    $localStorage.totalCost = totalCost;
    return totalCost;
  };

  $scope.makeReservation = function (e) {
    $state.go('personal');
  }

});