$(document).ready(function () {
  let sel = {};
  $('.amenity_checks').change(function () {
    if ($(this).is(':checked')) {
      sel[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete sel[$(this).attr('data-id')]
    }
    $('.amenities h4').text(Object.values(sel).join(', '));
  });
});