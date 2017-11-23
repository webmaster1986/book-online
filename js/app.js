var app = angular.module('book-online', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ui.router.state.events',
    'ngStorage',
  ]);

app.config(function($routeProvider) {

  $routeProvider

    .when('/login', {
      templateUrl : 'pages/login/login.html',
      controller: 'LoginController'
    })

    .when('/home', {
      templateUrl : 'pages/home/home.html',
      controller: 'HomeController'
    })

    .when('/suites', {
      templateUrl : 'pages/suites/suites_and_rates.html',
      controller: 'RateController'
    })

    .when('/personal', {
      templateUrl : 'pages/personal/personal_information.html',
      controller: 'PersonalController'
    })

    .when('/confirm', {
      templateUrl : 'pages/confirm/confirm_booking.html',
      controller: 'ConfirmController'
    })

    .otherwise({redirectTo: '/home'});
});

app.controller('LoginController', function($scope) {
  // Write Your dynamic code here
});

