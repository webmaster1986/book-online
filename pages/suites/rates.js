app.controller('ratesCtrl', function($scope, $localStorage, $state, $timeout) {

    $scope.$storage     = $localStorage;
    $scope.bookRooms    = [];
    $scope.roomList =[
        {
            "id":1,
            "name":"Casia Suite",
            "price":"76000",
            "duration":"2",
        },{
            "id":2,
            "name":"Kierie Klapper",
            "price":"78000",
            "duration":"3",
        },{
            "id":3,
            "name":"Kierie",
            "price":"79000",
            "duration":"4",
        }
    ];
    $localStorage.roomList = $scope.roomList;
    $scope.addRoom = function (roomId) {
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
    }
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