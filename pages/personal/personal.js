app.controller('personalCtrl', function($scope, $localStorage, $state) {
    $scope.$storage     = $localStorage;
    $scope.bookRooms    = $localStorage.bookRooms || [];
    $scope.roomList = $localStorage.roomList;
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
    $scope.personalDetails - function () {
      
    }
});