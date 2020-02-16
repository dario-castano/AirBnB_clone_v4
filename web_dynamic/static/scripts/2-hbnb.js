$(document).ready(function () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === "OK") $('#api_status').addClass('available');
  });
});
