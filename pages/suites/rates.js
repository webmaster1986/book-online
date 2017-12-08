app.controller('ratesCtrl', function ($scope, $localStorage, $state, $timeout, $http, API_URL, $filter) {
    
    $scope.$storage = $localStorage;
    
    $scope.confirmRoom = false;

    $scope.$storage.arrivalDate = moment($scope.$storage.arrivalDate);
    $scope.$storage.departureDate = moment($scope.$storage.departureDate);
    $scope.$storage.bookDate = moment($scope.$storage.bookDate);

    // Format Date according to api
    $scope.apiArrivalDate   = $scope.$storage.arrivalDate.format('YYYY-MM-D');
    $scope.apiDepartureDate = $scope.$storage.departureDate.format('YYYY-MM-D');
    
    $scope.checkInDate  = $scope.$storage.arrivalDate.format('D-MM-YYYY');
    $scope.checkOutDate = $scope.$storage.departureDate.format('D-MM-YYYY');

    $scope.checkInPicker = $scope.$storage.arrivalDate.format('D MMM YYYY');
    $scope.checkOutPicker = $scope.$storage.departureDate.format('D MMM YYYY');

    $scope.roomLists = function () {
        $http.get(API_URL + $scope.$storage.webKey + '/rates?format=json&type=standardroom&countrooms=1&occupancy=2,0,0,0,0,0,0&from=' + $scope.apiArrivalDate + '&to=' + $scope.apiDepartureDate + '&isocode=en&IncludeBookableRooms=true')
            .then(function (res) {
                $localStorage.hotelInformation = res.data.data.instances[0];
                $scope.roomList = res.data.data.instances[0].roomTypes;
            }, function () {
                console.log('Error in Fetching Room types');
            });
    };
    $scope.roomLists();
  pickmeup('.checkIn', {
    position: 'bottom',
    format: 'd-m-Y',
    default_date: false,
    hide_on_select: true,
    render: function(date) {
      if($scope.$storage.arrivalDate.isSame(moment(date))){
        return {
          selected   : true,
        }
      } else {
        return {
          selected   : false,
        }
      }
    }
  });
  pickmeup('.checkOut', {
    position: 'bottom',
    default_date: false,
    format: 'd-m-Y',
    hide_on_select: true,
    render: function(date) {
      if($scope.$storage.departureDate.isSame(moment(date))){
        return {
          selected   : true,
        }
      } else {
        return {
          selected   : false,
        }
      }
    }
  });
    
    var checkInResult = document.getElementsByClassName("checkIn");
    var checkIn = angular.element(checkInResult);
    
    checkIn[0].addEventListener('pickmeup-change', function (e) {
      $scope.checkInDate = moment(e.detail.date);
      $scope.checkInPicker = $scope.checkInDate.format('D MMM YYYY');
        if(!$scope.checkInDate.isSame($scope.$storage.arrivalDate)){
          $scope.$storage.arrivalDate = $scope.checkInDate;
          $localStorage.arrivalDate = $scope.checkInDate;
          $scope.apiArrivalDate = $scope.checkInDate.format('YYYY-MM-D');
          $localStorage.bookRooms = [];
          $scope.roomLists();
        }
    });
    
    var checkOutResult = document.getElementsByClassName("checkOut");
    var checkOut = angular.element(checkOutResult);
    
    checkOut[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkOutDate = moment(e.detail.date);
        $scope.checkOutPicker = $scope.checkOutDate.format('D MMM YYYY');
        if(!$scope.checkOutDate.isSame($scope.$storage.departureDate)) {
          $scope.$storage.departureDate = $scope.checkOutDate;
          $localStorage.departureDate = $scope.checkOutDate;
          $scope.apiDepartureDate = $scope.checkOutDate.format('YYYY-MM-D');
          $localStorage.bookRooms = [];
          $scope.roomLists();
        }
    });
    
    
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
    
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            $('.bxslider').bxSlider({
                mode: 'fade',
                captions: true,
                slideWidth: 600
            });
        }, 0);
    });
    
    $scope.moreInformation = function (roomId) {
        $http.get(API_URL + $scope.$storage.webKey + '/RoomTypes/' + roomId + '/WBEFull?format=json')
            .then(function (res) {
                $scope.roomTypeInfo = res.data.data;
            }, function () {
                console.log('Error in Fetching Room types');
            });
        $('#myModal').modal('show');
    };
    
    $scope.makeReservation = function (e) {
        $state.go('personal');
    }
    
});