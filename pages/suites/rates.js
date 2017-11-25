app.controller('ratesCtrl', function($scope, $localStorage, $state) {

    $scope.$storage     = $localStorage;

    var documentResult  = document.getElementsByClassName("checkIn");
    var element         = angular.element(documentResult);

    element[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkInDate = e.detail.formatted_date;
    });

    var documentResult  = document.getElementsByClassName("checkOut");
    var element         = angular.element(documentResult);

    element[0].addEventListener('pickmeup-change', function (e) {
        $scope.checkOutDate = e.detail.formatted_date;
    });

    pickmeup('.checkIn', {
        position       : 'bottom',
        hide_on_select : true
    });

    pickmeup('.checkOut', {
        position       : 'bottom',
        hide_on_select : true
    });

    $(function(){
        $('.bxslider').bxSlider({
            mode: 'fade',
            captions: true,
            slideWidth: 600
        });
    });

    $scope.makeReservation = function () {
        debugger
        $localStorage.checkInDate = $scope.checkInDate;
        $localStorage.checkOutDate = $scope.checkInDate;

        $state.go('personal');
    }
});