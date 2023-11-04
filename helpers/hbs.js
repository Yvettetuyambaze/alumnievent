//ABOUT CODES
//These functions provide various utility operations, including formatting dates, truncating strings, 
//stripping HTML tags, generating edit icons, and selecting options based on a provided value.



const moment = require('moment');

module.exports = {
  // Format the date in the specified format using the moment library
  formatDate: function (date, format) {
    return moment(date).utc().format(format);
  },

  // Truncate the input string to a specified length, adding ellipses if necessary
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' ';
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(' '));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },

  // Strip HTML tags from the input string using a regular expression
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },

  // Generate an edit icon for the event based on user permissions and settings
  editIcon: function (eventUser, loggedUser, eventId, floating = true) {
    if (eventUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/events/edit/${eventId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/events/edit/${eventId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return '';
    }
  },

  // Select the appropriate option based on the selected value in a dropdown menu
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      );
  },
};
