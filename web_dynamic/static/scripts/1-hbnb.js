const checkedAmenities = {};
$(document).ready(function () {
  $('input:checkbox').on('click', function () {
    const { id, name } = $(this).parent().data();
    if (this.checked) {
      checkedAmenities[id] = name;
    } else {
      delete checkedAmenities[id];
    }

    const selectedAmenities = Object.values(checkedAmenities).join(', ');

    $('.amenities h4').text(selectedAmenities);
  });
});
