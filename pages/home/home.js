app.controller('homeCtrl', function($scope, $localStorage, $state) {

    $scope.$storage = $localStorage;

    var days        = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthNames  = [ "January", "February", "March", "April",
                        "May", "June", "July", "August",
                        "September", "October", "November", "December"  ];
    var currentDate = new Date;

    var documentResult  = document.getElementsByClassName("three-calendars");
    var element         = angular.element(documentResult);

    $scope.date         = currentDate;
    $scope.firstDate    = currentDate.getDate();
    $scope.firstDay     = days[currentDate.getDay()];
    $scope.firstYear    = currentDate.getFullYear();
    $scope.firstMonth   = monthNames[currentDate.getMonth()];

    $scope.secondDate   = currentDate.getDate();
    $scope.secondDay    = days[currentDate.getDay()];
    $scope.secondYear   = currentDate.getFullYear();
    $scope.secondMonth  = monthNames[currentDate.getMonth()];

    $scope.totalAdults  = 0;
    $scope.totalChilds  = 0;

    pickmeup('.three-calendars', {
        flat      : true,
        date      : [
            new Date,
            currentDate
        ],
        mode      : 'range',
        calendars : 2
    });

    element[0].addEventListener('pickmeup-change', function (e) {
        $scope.firstDate    = e.detail.date;
        $scope.firstDate    = e.detail.date[0].getDate();
        $scope.firstDay     = days[e.detail.date[0].getDay()];
        $scope.firstYear    = e.detail.date[0].getFullYear();
        $scope.firstMonth   = monthNames[e.detail.date[0].getMonth()];

        $scope.secondDate   = e.detail.date;
        $scope.secondDate   = e.detail.date[1].getDate();
        $scope.secondDay    = days[e.detail.date[1].getDay()];
        $scope.secondYear   = e.detail.date[1].getFullYear();
        $scope.secondMonth  = monthNames[e.detail.date[1].getMonth()];

        $scope.date = e.detail.date;
        $scope.$apply();
    });
    $scope.incrementAdults = function () {
        $scope.totalAdults++;
    };
    $scope.incrementChilds = function () {
        $scope.totalChilds++;
    };
    $scope.decrementAdults = function () {
        $scope.totalAdults--;
    };
    $scope.decrementChilds = function () {
        $scope.totalChilds--;
    };
    $scope.checkAvailability = function () {
        if(!$scope.firstDate && !$scope.secondDate){

        }
        if(angular.isArray($scope.date)){
            $scope.arrivalDate = $scope.date[0];
            $scope.departureDate = $scope.date[1];
        }else {
            $scope.arrivalDate = $scope.date;
            $scope.departureDate = $scope.date;
        }
        $localStorage.totalChilds = $scope.totalChilds;
        $localStorage.totalAdults = $scope.totalAdults;
        $localStorage.arrivalDate = $scope.arrivalDate;
        $localStorage.departureDate = $scope.departureDate;
        $state.go('suites');
    }
});