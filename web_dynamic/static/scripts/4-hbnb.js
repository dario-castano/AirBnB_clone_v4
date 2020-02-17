const checkedAmenities = {};
$(document).ready(function () {
  // Fix firefox not refreshed checkboxes
  $('input:checkbox').prop('checked', false);

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
    if (data.status === 'OK') $('#api_status').addClass('available');
  });

  function setPlaces (place, user) {
    return `<article>
  <div class="title">
    <h2>${place.name}</h2>
    <div class="price_by_night">
      ${place.price_by_night}
    </div>
  </div>
  <div class="information">
    <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
      <br />
      ${place.max_guest} Guests
    </div>
    <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br />
      ${place.number_rooms} Bedrooms
    </div>
    <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
      <br />
      ${place.number_bathrooms} Bathroom
    </div>
  </div>

  <div class="user">
    <strong>Owner: ${user.first_name} ${user.last_name}</strong>
  </div>
  <div class="description">
    ${place.description}
  </div>
</article>`;
  }

  function placesHandler (data) {
    for (const place of data) {
      $.getJSON(
        `http://0.0.0.0:5001/api/v1/users/${place.user_id}`,
        (user) => $('.places').append(setPlaces(place, user))
      );
    }
  }

  $.post(
    {
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      success: placesHandler
    }
  );

  $('button').click(function (event) {
    const queryData = { amenities: Object.keys(checkedAmenities) };
    $.post(
      {
        contentType: 'application/json',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify(queryData),
        dataType: 'json',
        success: function (data) {
          $('.places').empty();
          $('.places').append('<h1>Places</h1>');
          placesHandler(data);
        }
      }
    );
  });
});
