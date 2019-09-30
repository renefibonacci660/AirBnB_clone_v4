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
      if (data.textStatus === "OK") {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
  });
});
