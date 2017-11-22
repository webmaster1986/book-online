(function(){
  app.factory('$api', api)
  function api($window, $http, $q, $rootScope, $timeout, $state, $localStorage,  $mdDialog, $httpParamSerializer, socketFactory, API_URL)
  {
    return {
      login	    : login,
      logout      : logout,
      headerAuth  : headerAuth,
      isAuthorized: isAuthorized,
      refreshToken: refreshToken,
      me          : me,
      getall          : getall,
      get             : get,
      save            : save,
      update          : update,
      remove          : remove,
      search          : search,
      load            : load,
      table           : table,
      exportReport    : exportReport,
      connectSocket   : connectSocket
    };

    /*
    *	User Authentication functions
    *	- login
    *	- logout
    */
    function headerAuth()
    {
      var token = $localStorage.token ? $localStorage.token : '';
      return {headers: {"Authorization" : 'Bearer '+token}};
    }

    function isAuthorized(promise)
    {
      promise.success(function(res){
        if($localStorage.page) $localStorage.page.loader = false;
      });
      promise.error(function(res){
        $rootScope.isLoading        = false;
        console.log($localStorage.page)
        $localStorage.page.loader   = false;
        if(res && res.status_code == 401)
        {
          $localStorage.$reset();
          $state.go('login');
        }
        else if(res.message)
        {
          //Popup Error
          var errors = '';
          if(res && res.errors){
            angular.forEach(res.errors, function(item){
              angular.forEach(item, function(err){errors += err+"\n";})
            })
          }else{
            errors      = res.message;
            res.message = '';
          }

          $mdDialog.show($mdDialog.immsAlert({locals : {data:{title:res.message, content:errors}}}));
        }
        else
          $mdDialog.show($mdDialog.immsAlert({locals : {data:{title:'', content:'An error occurred while processing your request.'}}}));
      });

      return promise;
    }

    function login(params)
    {
      return $http.post(API_URL+'/api/auth/login', params);
    }

    function me(params)
    {
      var request = $http.get(API_URL+'/api/me', this.headerAuth());
      return this.isAuthorized(request);
    }

    function refreshToken(refreshToken)
    {
      var request = $http.post(API_URL+'/api/auth/refresh', {refreshToken: refreshToken}, this.headerAuth());
      return this.isAuthorized(request);
    }

    function logout(params)
    {
      $http.get(API_URL+'/api/auth/logout', this.headerAuth())
        .then(function(res){
          $localStorage.$reset();
          $state.go('login');
          socket.disconnect();
          socket = undefined;
        }, function(){
          socket.disconnect();
          socket = undefined;
          $localStorage.$reset();
          $state.go('login');
        })
    }

    function getall(type, params)
    {
      if(!params)
        params = {show: 'active',limit: 0};
      else
        params.limit  = 0;

      var request = $http.get(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+'?'+$httpParamSerializer(params), this.headerAuth());
      return this.isAuthorized(request);
    }

    function search(type, filter, limit)
    {
      var search = [];
      angular.forEach(filter, function(value, key){
        if (value) search.push(key + '$' + value);
      });

      var query = {
        show    : 'active',
        isDeleted : 0,
        //order   : '-id',
        limit   : limit == undefined ? 10 : limit,
        filter  : search.toString()
      };

      var request = $http.get(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+'?'+$httpParamSerializer(query), this.headerAuth());
      return this.isAuthorized(request)
        .then(function(res){
          return res.data.data;
        }, function(res){
          console.warn(res);
        });
    }

    function load(name, params)
    {
      var self     = this;
      if(!$localStorage.libraries) $localStorage.libraries = {};
      if(typeof name === 'string') name = [name];
      angular.forEach(name, function(item){
        var libName = item;
        var cache   = false;
        if(item.substring(0, 1) == '-')
        {
          var libName = item.substring(1);
          var cache   = true;
        }

        var checked = false;
        if(cache && $localStorage.libraries[libName] && $localStorage.libraries[libName].length) {
          if (libName != "userTypes" || libName != "mlTypes")
            checked = true;
        }
        else {
          checked = true;
        }

        if (checked) {
          self.getall(libName, params)
            .success(function(res){
              if (libName == 'rates') {
                var ratesMat = [];
                var ratesLabor = [];
                angular.forEach(res.data, function(item) {
                  if (item.mlType.id == 3)
                    ratesMat.push(item);
                  else
                    ratesLabor.push(item);
                });
                $localStorage.libraries[libName] = res.data;
                $localStorage.libraries['ratesMat'] = ratesMat;
                $localStorage.libraries['ratesLabor'] = ratesLabor;
              } else {
                $localStorage.libraries[libName] = res.data;
              }

            })
        }

      })
    }


    function get(type, id)
    {
      id = id ? '/'+id : '';
      var request = $http.get(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+id, this.headerAuth());
      return this.isAuthorized(request);
    }

    function save(type, params)
    {
      var request = $http.post(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase(), params, this.headerAuth());
      return this.isAuthorized(request);
    }

    function update(type, params)
    {
      var id = (type != 'me') ? '/'+params.id :  '';
      var request = $http.put(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+id, params, this.headerAuth());
      return this.isAuthorized(request);
    }

    function remove(type, id)
    {
      var request = $http.delete(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+'/'+id, this.headerAuth());
      return this.isAuthorized(request);
    }


    function connectSocket(token)
    {
      if (typeof socket === 'undefined')
      {
        socket = socketFactory({
          ioSocket: io.connect(API_URL, {
            reconnection        : true,
            reconnectionDelay   : 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 15
          })
        });

        socket.on('connect', function () {
          console.log('socket connecting..');

          socket.emit('authenticate', { token: token })

          socket.on('authenticated', function (message) {
            console.log('socket connected!');
            socket.on('imms-notifications', function (message) {
              $rootScope.$broadcast('receivedNotification', message);
            });
          });

          socket.on('unauthorized', function (msg) {
            console.log("unauthorized: " + JSON.stringify(msg));
            logout();
          });
        });
      }
    }

    function table(type, params)
    {
      var deferred     = $q.defer();
      var request      = $http.get(API_URL+'/api/'+type.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()+'?'+$httpParamSerializer(params), this.headerAuth());

      $localStorage.page.loader = true;

      request.success( function( res ){

        if (res.hasOwnProperty("xls")) {
          document.location.href="/xlsx/"+res.xls+".xlsx";
          $mdDialog.hide();

        }
        else {
          var limitOptions = [10,15,20, 30, 40, 50/*, {
                            label   : 'All',
                            value   : function () {
                                return 0;
                            }
                        }*/];

          deferred.resolve({
            raw         : res,
            limitOptions: limitOptions,
            data        : res.data,
            query       : {
              order   : res.meta.order,
              page    : res.meta.pagination.current_page,
              total   : res.meta.pagination.total,
              limit   : params && params.limit == 0 ? 0 : res.meta.pagination.per_page,
            }
          });
        }

        $localStorage.page.loader = false;

      });

      request.error(function(res){
        if(res && res.status_code == 401)
        {
          $localStorage.$reset();
          $state.go('login');
        }
        else if($localStorage.page)
        {
          $localStorage.page.loader = false;
        }
        deferred.reject(res);
      });

      return deferred.promise;
    }

    function exportReport(params)
    {
      $localStorage.page.loader = true;

      var deferred     = $q.defer();
      var request      = $http.get(API_URL+'/api/reports/export/' + params, this.headerAuth());

      request.success( function( res ){

        document.location.href="/xlsx/"+res.xls+".xlsx";
        $localStorage.page.loader = false;

      });

      request.error(function(res){
        $localStorage.page.loader = false;
        deferred.reject(res);
      });

      return deferred.promise;
    }
  }
})();
