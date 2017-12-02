var app = angular.module('bookOnline', [
    'ngResource',
    'ui.router',
    'ui.router.state.events',
    'ngStorage',
]);

app.constant('API_URL', 'https://connect.protel.net/WBE/1/');