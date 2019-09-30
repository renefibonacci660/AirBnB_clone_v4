$(document).ready(function () {
  const chkbox_array = [];
  $('input[type=checkbox]').each(function () {
    $(this).change(function () {
      if (this.checked) {
        chkbox_array.push(this.getAttribute('data-name'));
      } else {
        const index = chkbox_array.indexOf(this.getAttribute('data-name'));
        if (index > -1) {
          chkbox_array.splice(index, 1);
        }
      }
      $('div.amenities h4').html(chkbox_array.join(', '));
    });
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
    if (data.status === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}'
  }).done(function (data) {
    $.each(data, function (index, place) {
      const html = `
      <article>
      <div class='title'>
      <h2>${place.name}</h2>
      <div class='price_by_night'>
      $${place.price_by_night}
      </div>
      </div>
      <div class='information'>
      <div class = 'max_guest'>
      <i class='fa fa-users fa-3x' aria-hidden='true'></i>
      <br />
      ${place.max_guest} Guests 
      </div> 
      <div class='number_rooms'> 
      <i class='fa fa-bed fa-3x' aria-hidden='true'></i> 
      <br /> 
      ${place.number_rooms} Bedrooms 
      </div>
      <div class='number_bathrooms'>
      <i class='fa fa-bath fa-3x' aria-hidden='true'></i>
      <br />
      ${place.number_bathrooms} Bathroom
      </div>
      </div>
      <div class='description'>
      ${place.description}
      </div> 
      </article>`;
      $(html).insertAfter('section.places h1');
    });
  });
});
