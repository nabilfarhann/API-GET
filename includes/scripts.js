var all_data = [];
var data = '';

var dates =
	"<div class='form-group'><label class='control-label'>Filter by Date  </label><input type='date' id='date-selection' onchange='dateFilter()''></div>";

let dropdown = $('#partner-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Partner</option>');
dropdown.prop('selectedIndex', 0);

const url = 'http://localhost:5000/api/test/partners';

// Populate dropdown with list of provinces
$.getJSON(url, function(data) {
	$.each(data, function(key, value) {
		// console.log(value[0].title);

		var array = ['All Partner', value[0].title];
		for (var i = 1; i < value.length; i++) {
			if ($.inArray(value[i].title, array) == -1) {
				array.push(value[i].title);
			}
			all_data.push(value[i]);
		}
		// console.log(array);

		for (var j = 0; j < array.length; j++) {
			dropdown.append(
				$('<option></option>')
					.attr('value', array[j])
					.text(array[j])
			);
		}
	});
});

dropdown.click(function() {
	var partner_name = $('#partner-dropdown option:selected').text();
	var number = 1;
	var total = 0;
	data = undefined;

	data +=
		"<thead><tr><th class='partner-table__number'>#</th><th class='partner-table__number'>Partner</th><th class='partner-table__title'>Description</th><th class='partner-table__date'>Date</th></tr></thead>";
	for (var i = 0; i < all_data.length; i++) {
		if (all_data[i].title == partner_name) {
			data +=
				"<tr><td class='partner-table__number'>" +
				number +
				"</td><td class='partner-table__number'>" +
				all_data[i].title +
				"</td><td class='partner-table__name'>" +
				all_data[i].description +
				"</td><td class='partner-table__date'>" +
				all_data[i].date +
				'</td></tr>';
			number++;
			total++;
		} else if (partner_name == 'All Partner') {
			data +=
				"<tr><td class='partner-table__number'>" +
				number +
				"</td><td class='partner-table__number'>" +
				all_data[i].title +
				"</td><td class='partner-table__name'>" +
				all_data[i].description +
				"</td><td class='partner-table__date'>" +
				all_data[i].date +
				'</td></tr>';
			number++;
			total++;
		}
	}

	var partner_counter = 'Total number of request: ' + total;

	$('#table-list').html(data);
	$('#partner-count').html(partner_counter);
	$('#datediv').html(dates);
});

// console.log(all_data);

function dateFilter() {
	var partner_name = $('#partner-dropdown option:selected').text();
	var x = document.getElementById('date-selection').value;
	var numbers = 1;
	var totals = 0;
	data = undefined;
	data +=
		"<thead><tr><th class='partner-table__number'>#</th><th class='partner-table__number'>Partner</th><th class='partner-table__title'>Description</th><th class='partner-table__date'>Date</th></tr></thead>";

	for (var i = 0; i < all_data.length; i++) {
		if (all_data[i].title == partner_name) {
			if (x == all_data[i].date) {
				data +=
					"<tr><td class='partner-table__number'>" +
					numbers +
					"</td><td class='partner-table__number'>" +
					all_data[i].title +
					"</td><td class='partner-table__name'>" +
					all_data[i].description +
					"</td><td class='partner-table__date'>" +
					all_data[i].date +
					'</td></tr>';
				numbers++;
				totals++;
			}
		} else if (partner_name == 'All Partner') {
			if (x == all_data[i].date) {
				data +=
					"<tr><td class='partner-table__number'>" +
					numbers +
					"</td><td class='partner-table__number'>" +
					all_data[i].title +
					"</td><td class='partner-table__name'>" +
					all_data[i].description +
					"</td><td class='partner-table__date'>" +
					all_data[i].date +
					'</td></tr>';
				numbers++;
				totals++;
			}
		}
	}

	var partner_counter = 'Total number of request: ' + totals;

	$('#table-list').html(data);
	$('#partner-count').html(partner_counter);
	$('#datediv').html(dates);
}
