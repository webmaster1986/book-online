app.controller('ratesCtrl', function($scope, $localStorage, $state, $timeout, $http, API_URL) {

    $scope.$storage     = $localStorage;
    $scope.bookRooms    = [];
    $scope.confirmRoom  = false;
    $scope.roomLists = function () {
      $http.get(API_URL+ $scope.$storage.webKey +'/RoomTypes/WBEFull?format=json&isocode=de')
        .then(function(res){
            $scope.roomList = res.data.data;
        }, function(){
        });
    };
    $scope.roomLists();
    $localStorage.roomList = $scope.roomList;
    $scope.addRoom = function (roomId) {
        debugger
        if ($scope.bookRooms.indexOf(roomId) === -1) {
          $scope.bookRooms.push(roomId);
        }
        $localStorage.bookRooms = $scope.bookRooms;
    };
    $scope.removeRoom = function (roomId) {
        $scope.bookRooms.forEach(function(room,index){
            if(room === roomId) {
            $scope.bookRooms.splice(index, 1);
            }
        });
        $localStorage.bookRooms = $scope.bookRooms;
    };
    $scope.getTotalCost = function () {
        var totalCost = 0;
        $scope.bookRooms.forEach(function(r){
            $scope.roomList.forEach(function(room){
                if (r === room.id) {
                    totalCost += parseFloat(room.price);
                }
            });
        });
        return totalCost;
    };
    $timeout(function () {
        $('.bxslider').bxSlider({
            mode: 'fade',
            captions: true,
            slideWidth: 600
        });
    }, 2);
    var documentResult  = document.getElementsByClassName("checkIn");
    var checkIn         = angular.element(documentResult);

    checkIn[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkInDate = e.detail.formatted_date;
    });

    var documentResult  = document.getElementsByClassName("checkOut");
    var checkOut         = angular.element(documentResult);

    checkOut[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkOutDate = e.detail.formatted_date;
    });

    pickmeup('.checkIn', {
        position       : 'bottom',
        date : [
            new Date($scope.$storage.arrivalDate)
        ],
        hide_on_select : true
    });

    pickmeup('.checkOut', {
        position       : 'bottom',
        date : [
            new Date($scope.$storage.departureDate)
        ],
        hide_on_select : true
    });


    $scope.makeReservation = function (e) {
        $state.go('personal');
        e.stopPropagation();
    }
});