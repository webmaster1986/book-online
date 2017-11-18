$(function () {
	
	$('.3-calendars').pickmeup({
			flat		: true,
			mode		: 'range',
			calendars	: $( window ).width()<639 ? 1 : 2
		});

});
