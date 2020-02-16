const checkedAmenities = {};
$(document).ready(function () {
  $('input:checkbox').on('click', function () {
    const { id, name } = $(this).data();
    if (this.checked) {
      checkedAmenities[id] = name;
    } else {
      delete checkedAmenities[id];
    }

    const selectedAmenities = Object.values(checkedAmenities).join(', ');

    $('.amenities h4').text(selectedAmenities);
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === "OK") $('#api_status').addClass('available');
  });
});
