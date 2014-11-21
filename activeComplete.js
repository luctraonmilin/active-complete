/* activeComplete
 *
 * A jQuery autocompletion plugin for ActiveAdmin.
 *
 * Author:  Luc Traonmilin (luc.traonmilin@gmail.com)
 * Date:    2014-11-21
 * License: MIT
 */
(function ($) {
  
  /*
   * jQuery function.
   */
  $.fn.activeComplete = function () {

    /* 
     * Iterate through each item.
     */
    this.each(function (index, element) {
      
      /* Retrieve the original <select> element. */
      var select = $(element);
      
      /* Hide it. */
      select.hide();
      
      /* Generate a (hopefully) unique ID for the data list. */
      var listId = select.attr('id') + '-datalist';

      /* Prepare the data list. */
      var options = select.find('option');
      var list = $('<datalist id="' + listId + '"></datalist>');

      /* Populate. */
      options.each(function (_, option) {
        var item = $('<option value="' + $(option).text()  + '" data-value="' + $(option).val() + '">');
        list.append(item);
      });

      /* Create the autocomplete input. */
      var input = $('<input list="' + listId + '" type="text">');

      /* Place it on the page. */
      select.after(list);
      select.after(input);

      /* Listen for events in order to update the select element. */
      input.on('input', function () {
        var label = input.val();
         
        for (var i = 0, l = options.length; i < l; ++i) {
          if ($(options[i]).text() === label) {
            $(options[i]).prop('selected', true);
          }
        }
      });

      /* Initialize the input if the select has a selected value. */
      var selectedId = select.val();
      if (selectedId) {
        input.val(list.find("[data-value='" + selectedId + "']").val());
      }
    });
  };
}(jQuery));

