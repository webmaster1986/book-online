app.controller('homeCtrl', function ($scope, $localStorage, $state, API_URL, $http, $api, $rootScope) {
    
    $scope.$storage = $localStorage;
    
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"];
    
    
    $scope.$on('$viewContentLoaded', function () {
        $scope.$emit('getBookingDate');
    });
    
    $scope.checkInDate = ($localStorage.arrivalDate) ? new Date($scope.$storage.arrivalDate) : new Date();
    $scope.checkOutDate = ($localStorage.departureDate) ? new Date($scope.$storage.departureDate) : new Date();
    
    var documentResult = document.getElementsByClassName("three-calendars");
    var element = angular.element(documentResult);
    
    pickmeup('.three-calendars', {
        flat: true,
        mode: 'range',
        format: 'Y-m-d',
        date: [
            $scope.checkInDate,
            $scope.checkOutDate
        ],
        render : function (date) {
            if (date < new Date()) {
                return {disabled : true, class_name : 'date-in-past'};
            }
            return {};
        },
        calendars: 2,
    });
    
    $scope.firstDate = ($scope.checkInDate.getDate() <= 9) ? '0' + $scope.checkInDate.getDate() : $scope.checkInDate.getDate();
    $scope.firstDay = days[$scope.checkInDate.getDay()];
    $scope.firstYear = $scope.checkInDate.getFullYear();
    $scope.firstMonth = monthNames[$scope.checkInDate.getMonth()];
    
    $scope.secondDate = ($scope.checkOutDate.getDate() <= 9) ? '0' + $scope.checkOutDate.getDate() : $scope.checkOutDate.getDate();
    $scope.secondDay = days[$scope.checkOutDate.getDay()];
    $scope.secondYear = $scope.checkOutDate.getFullYear();
    $scope.secondMonth = monthNames[$scope.checkOutDate.getMonth()];
    
    $scope.totalAdults = 0;
    $scope.totalChilds = 0;
    
    
    element[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkInDate = e.detail.date[0];
        
        $scope.firstDate = ($scope.checkInDate.getDate() <= 9) ? '0' + $scope.checkInDate.getDate() : $scope.checkInDate.getDate();
        $scope.firstDay = days[$scope.checkInDate.getDay()];
        $scope.firstYear = $scope.checkInDate.getFullYear();
        $scope.firstMonth = monthNames[$scope.checkInDate.getMonth()];
        
        $scope.checkOutDate = e.detail.date[1];
        
        $scope.secondDate = ($scope.checkOutDate.getDate() <= 9) ? '0' + $scope.checkOutDate.getDate() : $scope.checkOutDate.getDate();
        $scope.secondDay = days[$scope.checkOutDate.getDay()];
        $scope.secondYear = $scope.checkOutDate.getFullYear();
        $scope.secondMonth = monthNames[e.detail.date[1].getMonth()];
        
        $scope.date = e.detail.formatted_date;
        $scope.$apply();
    });
    
    $scope.submitHomeForm = function () {
        if (angular.isArray($scope.date)) {
            $scope.checkInDate = $scope.date[0];
            $scope.checkOutDate = $scope.date[1];
        } else {
            $scope.checkInDate = $scope.date;
            $scope.checkOutDate = $scope.date;
        }
        $localStorage.arrivalDate = $scope.checkInDate;
        $localStorage.departureDate = $scope.checkOutDate;
        $state.go('suites');
    };
});