app.controller('HomeController', function($scope) {
  $( document ).ready(function() {
    var plus_5_days	= new Date;
    plus_5_days.setDate(plus_5_days.getDate() + 3);
    $('.three-calendars').pickmeup({
      flat		: true,
      mode		: 'range',
      date		: [
        new Date,
        plus_5_days
      ],
      calendars	: $( window ).width()<639 ? 1 : 2
    });
  });
});