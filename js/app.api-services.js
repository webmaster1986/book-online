(function(){
  app.factory('$api', api)
    function api($window, $http, $q, $rootScope, $timeout, $state, $localStorage,  $httpParamSerializer, API_URL){

      $rootScope.checkInDate = '';
      return {
        getBookingDate  : getBookingDate,
        get             : get,
      };

      function get(type, id)
      {
        var request = $http.get(API_URL+ id + type);
        return request;
      }
      function getBookingDate(params)
      {
        var request = $http.get(API_URL+ $localStorage.webKey +'/BookingDate?format=json');
        return request;
      }

    }
})();
