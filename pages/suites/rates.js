app.controller('ratesCtrl', function ($scope, $localStorage, $state, $timeout, $http, API_URL, $filter) {
    
    $scope.$storage = $localStorage;
    
    $scope.confirmRoom = false;
    
    // Format Date according to api
    $scope.apiArrivalDate = $filter('date')($scope.$storage.arrivalDate, "yyyy-MM-dd");
    $scope.apiDepartureDate = $filter('date')($scope.$storage.departureDate, "yyyy-MM-dd");
    
    $scope.checkInDate = $filter('date')($scope.$storage.arrivalDate, "dd MMM yyyy");
    $scope.checkOutDate = $filter('date')($scope.$storage.departureDate, "dd MMM yyyy");
    
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
        min: new Date($localStorage.bookDate),
        separator: ' ',
        date: [
            new Date($scope.$storage.arrivalDate)
        ],
        hide_on_select: true
    });
    
    pickmeup('.checkOut', {
        position: 'bottom',
        format: 'd-m-Y',
        separator: ' ',
        min: new Date($scope.$storage.arrivalDate),
        date: [
            new Date($scope.$storage.departureDate)
        ],
        hide_on_select: true
    });
    
    var checkInResult = document.getElementsByClassName("checkIn");
    var checkIn = angular.element(checkInResult);
    
    checkIn[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkInDate = $filter('date')(e.detail.date, "dd MMM yyyy");
        // $scope.checkInDate = e.detail.formatted_date;
        if (e.detail.formatted_date - $localStorage.arrivalDate !== 0) {
            $scope.$storage.arrivalDate = e.detail.formatted_date;
            $localStorage.arrivalDate = e.detail.date;
            $scope.apiArrivalDate = $filter('date')(e.detail.date, "yyyy-MM-dd");
            $scope.roomLists();
        }
    });
    
    var checkOutResult = document.getElementsByClassName("checkOut");
    var checkOut = angular.element(checkOutResult);
    
    checkOut[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkOutDate = $filter('date')(e.detail.date, "dd MMM yyyy");
        if ($scope.checkOutDate !== $localStorage.departureDate) {
            $scope.$storage.departureDate = e.detail.formatted_date;
            $localStorage.departureDate = e.detail.date;
            $scope.apiDepartureDate = $filter('date')(e.detail.date, "yyyy-MM-dd");
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