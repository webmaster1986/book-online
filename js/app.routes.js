(function(){
    app.run(function($rootScope, $state, $timeout) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            $rootScope.currentState                 = $state.current.url;
            $rootScope.currentStateName             = toState.name;
            if(toState.title) $rootScope.pageTitle  = toState.title;
            $rootScope.backPage = toState.back ? toState.back : undefined;

        });
    });
    app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider)
    {
        $locationProvider.hashPrefix('');
        $stateProvider
            .state('home', {
                url		: '/home',
                title   : 'Select Date',
                views	:{
                    '':{
                        templateUrl	: 'index.html',
                    },
                    'home':{
                        templateUrl	: '/pages/home/home.html',
                    }
                }
            })

            .state('suites', {
                title   : 'Suites & Rates',
                url		: "/suites",
                views	: {
                    'suites': {
                        templateUrl	: '/pages/suites/suites_and_rates.html',
                        controller  : 'ratesCtrl',
                    },
                }
            })

            .state('personal', {
                title   : 'Personal Information',
                url		: '/personal',
                views	:{
                    'personal':{
                        templateUrl	: '/pages/personal/personal_information.html',
                        controller  : 'personalCtrl'
                    }
                }
            })

            .state('confirm', {
                title   : 'Confirm Booking',
                url		: '/confirm',
                views	:{
                    'confirm':{
                        templateUrl	: '/pages/confirm/confirm_booking.html',
                        controller  : 'confirmCtrl'
                    }
                }
            })
            .state('thanks', {
                title   : 'Thank You',
                url		: '/thanks',
                views	:{
                    'thanks':{
                        templateUrl	: '/pages/thanks/thank_you.html',
                        controller  : 'thanksCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise("/home");
    })
})();