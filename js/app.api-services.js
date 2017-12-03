(function(){
  app.factory('$api', api)
    function api($window, $http, $q, $rootScope, $timeout, $state, $localStorage,  $httpParamSerializer, API_URL){

      $rootScope.checkInDate = '';
      return {
        getRooms      : getRooms,
        getBookingDate  : getBookingDate,
        get             : get,
      };

      function get(type, id)
      {
        var request = $http.get(API_URL+ id + type);
        return request;
      }


      function getRooms(params)
      {
        $http.get(API_URL+ +'/RoomTypes/WBEFull?format=json&isocode=de')
          .then(function(res){
            debugger
          }, function(){
            debugger
          })
      }
      function getBookingDate(params)
      {
        var request = $http.get(API_URL+ $localStorage.webKey +'/BookingDate?format=json');
        return request;
      }

    }
})();
