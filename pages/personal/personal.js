app.controller('personalCtrl', function ($scope, $localStorage, $state, $filter) {
  $('input:empty').addClass('empty');

  $('input').keyup(function () {
    if ($(this).val().trim() !== '') {
      $(this).removeClass('empty');
    } else {
      $(this).addClass('empty');
    }
  });
  $scope.guestCount = 0;

  $scope.$storage = $localStorage;

  if($localStorage.userInformation){
    $('input').removeClass('empty');
    $scope.personal = $localStorage.userInformation;
  }

  $localStorage.bookRooms = ($localStorage.bookRooms) ? $localStorage.bookRooms : [];

  $scope.$storage.arrivalDate = moment($scope.$storage.arrivalDate);
  $scope.$storage.departureDate = moment($scope.$storage.departureDate);

  $scope.checkInDate  = $scope.$storage.arrivalDate.format('D-MMM-YYYY');
  $scope.checkOutDate = $scope.$storage.departureDate.format('D-MMM-YYYY');

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
        $scope.guests = [];
        for(var i=1; i<=$scope.guestCount;i++){
          var guestName       = eval("$scope.personal.guestName"+i);
          var guestEmail      = eval("$scope.personal.guestEmail"+i);
          var guestSurname    = eval("$scope.personal.guestSurname"+i);
          var guestTelephone  = eval("$scope.personal.guestTelephone"+i);
          $scope.guests.push({
            guestName : guestName,
            guestEmail : guestEmail,
            guestSurname : guestSurname,
            guestTelephone : guestTelephone,
          });
        }
        $localStorage.userInformation = $scope.personal;
        $localStorage.userInformation.guests = $scope.guests;

        $state.go('confirm');
    };
    
    $scope.back = function () {
        $state.go('suites');
    }
});

app.directive('addHtml', function ($compile) {
  return function(scope, element, attrs){
    element.bind("click", function(){
      scope.guestCount++;
      angular.element(document.getElementById('guest_information')).append($compile(
        '<div class="col-md-6 col-sm-12 col-xs-12">' +
        '<div class="form_data">' +
        '<h3>Guest '+ scope.guestCount +' Information</h3>' +
        '<div class="form-group">' +
        '<select class="form-control">' +
        '<option>Mr.</option>' +
        '<option>Ms.</option>' +
        '<option>Mrs.</option>' +
        '<option>Miss</option>' +
        '</select>' +
        '</div>' +
        '<div class="form-group">' +
        '<div ng-messages="personalForm.guestName'+ scope.guestCount +'.$error" style="color:#9A2F21"  ng-if="personalForm.guestName'+ scope.guestCount +'.$dirty">' +
        '<div ng-message="required">Guest Name is required.</div>' +
        '</div>' +
        '<input type="text" ng-model="personal.guestName'+ scope.guestCount +'" name="guestName'+ scope.guestCount +'" class="form-control" placeholder="Name" required ng-required="true">' +
        '</div>' +
        '<div class="form-group">' +
        '<div ng-messages="personalForm.guestSurname'+ scope.guestCount +'.$error" style="color:#9A2F21"  ng-if="personalForm.guestSurname'+ scope.guestCount +'.$dirty">' +
        '<div ng-message="required">Guest Surname is required.</div>' +
        '</div>' +
        '<input ng-required="true" type="text" ng-model="personal.guestSurname'+ scope.guestCount +'" name="guestSurname'+ scope.guestCount +'" class="form-control" placeholder="Surname" required>' +
        '</div>' +
        '<div class="form-group">' +
        '<div ng-messages="personalForm.guestEmail'+ scope.guestCount +'.$error" style="color:#9A2F21"  ng-if="personalForm.guestEmail'+ scope.guestCount +'.$dirty">' +
        '<div ng-message="required">E-mail address is required.</div>' +
        '</div>' +
        '<input ng-required="true" type="email" ng-model="personal.guestEmail'+ scope.guestCount +'" name="guestEmail'+ scope.guestCount +'" class="form-control" placeholder="E-mail address" required>' +
        '</div>' +
        '<div class="form-group">' +
        '<div ng-messages="personalForm.guestTelephone.$error'+ scope.guestCount +'" style="color:#9A2F21"  ng-if="personalForm.guestTelephone.$dirty'+ scope.guestCount +'">' +
        '<div ng-message="required">Telephone Number is required.</div>' +
        '</div>' +
        '<input ng-required="true" type="text" ng-model="personal.guestTelephone'+ scope.guestCount +'" name="guestTelephone'+ scope.guestCount +'" class="form-control" placeholder="Telephone number" required>' +
        '</div>' +
        '</div>' +
        '</div>'
      )(scope));
    });
  };
});


