(function(){
  app.factory('$api', api)
    function api($window, $http, $q, $rootScope, $timeout, $state, $localStorage,  $httpParamSerializer, API_URL){
      return {
        login	        : login,
        logout        : logout,
        headerAuth    : headerAuth,
        isAuthorized  : isAuthorized,
        refreshToken  : refreshToken,
        table         : table,
        getRooms      : getRooms
      };

      // function table(type, params)
      // {
      //   var deferred     = $q.defer();
      //   var request      = $http.get(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+'?'+$httpParamSerializer(params), this.headerAuth());
      //
      //   $localStorage.page.loader = true;
      //
      //   request.success( function( res ){
      //     deferred.resolve({
      //       raw         : res,
      //       limitOptions: limitOptions,
      //       data        : res.data,
      //       query       : {
      //         order   : res.meta.order,
      //         page    : res.meta.pagination.current_page,
      //         total   : res.meta.pagination.total,
      //         limit   : params && params.limit == 0 ? 0 : res.meta.pagination.per_page,
      //       }
      //     });
      //   });
      //
      //   request.error(function(res){
      //     if(res && res.status_code == 401)
      //     {
      //       $localStorage.$reset();
      //       $state.go('login');
      //     }
      //     else if($localStorage.page)
      //     {
      //       $localStorage.page.loader = false;
      //     }
      //     deferred.reject(res);
      //   });
      //
      //   return deferred.promise;
      // }

      function getRooms(params)
      {
        $http.get(API_URL+ +'/RoomTypes/WBEFull?format=json&isocode=de')
          .then(function(res){
            debugger
          }, function(){
            debugger
          })
      }

    }
})();
