app.controller('personalCtrl', function ($scope, $localStorage, $state, $filter) {
    $scope.$storage = $localStorage;
    $localStorage.bookRooms = ($localStorage.bookRooms) ? $localStorage.bookRooms : [];
    
    $scope.checkInDate   =   $filter('date')($scope.$storage.arrivalDate, "dd MMM yyyy");
    $scope.checkOutDate =   $filter('date')($scope.$storage.departureDate, "dd MMM yyyy");
    
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
    
    $scope.submitForm = function (form) {
        
        angular.forEach(form.$error, function (field) {
            angular.forEach(field, function (errorField) {
                errorField.$setTouched();
            })
        });
        
        if (form.$invalid) return;
        
        $localStorage.userInformation = $scope.personal;
        $state.go('confirm');
    };
    
    $scope.back = function () {
        $state.go('suites');
    }
});

app.directive('addHtml', function ($compile) {
    
    return function(scope, element, attrs){
        var html = '<div class="row">' +
            '<div class="col-md-6 col-sm-12 col-xs-12">' +
            '<div class="form_data">' +
            '<h3>Guest Information</h3>' +
            '<div class="form-group">' +
            '<select class="form-control">' +
            '<option>Mr.</option>' +
            '<option>Ms.</option>' +
            '<option>Mrs.</option>' +
            '<option>Miss</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group">' +
            '<div ng-messages="personalForm.guestName.$error">' +
            '<div ng-message="required">Guest Name is required.</div>' +
            '</div>' +
            '<input type="text" ng-model="personal.guestName" name="guestName[]" class="form-control" placeholder="Name" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<div ng-messages="personalForm.guestSurname.$error">' +
            '<div ng-message="required">Guest Surname is required.</div>' +
            '</div>' +
            '<input type="text" ng-model="personal.guestSurname" name="guestSurname[]" class="form-control" placeholder="Surname" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<div ng-messages="personalForm.guestEmail.$error">' +
            '<div ng-message="required">E-mail address is required.</div>' +
            '</div>' +
            '<input type="text" ng-model="personal.guestEmail" name="guestEmail[]" class="form-control" placeholder="E-mail address" required>' +
            '</div>' +
            '<div class="form-group">' +
            '<div ng-messages="personalForm.guestTelephone.$error">' +
            '<div ng-message="required">Telephone Number is required.</div>' +
            '</div>' +
            '<input type="text" ng-model="personal.guestTelephone" name="guestTelephone[]" class="form-control" placeholder="Telephone number" required>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        element.bind("click", function(){
            scope.count++;
            angular.element(document.getElementById('guest_information')).append($compile(html)(scope));
        });
    };
});


