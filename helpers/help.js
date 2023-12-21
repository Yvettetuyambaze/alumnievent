// hbs.js

const moment = require('moment');

// Format the date in the specified format using the moment library
const formatDate = (date, format) => {
  return moment(date).utc().format(format);
};

// Truncate the input string to a specified length, adding ellipses if necessary
const truncate = (str, len) => {
  if (!str || str.length === 0) {
    return ''; // Handle the case where str is undefined or an empty string
  }

  if (str.length > len) {
    let truncatedStr = str.substring(0, len).trim(); // Truncate and remove trailing spaces
    truncatedStr = truncatedStr.substr(0, truncatedStr.lastIndexOf(' '));
    return truncatedStr.length > 0 ? truncatedStr + '...' : str.substr(0, len) + '...';
  }

  return str;
};

// Strip HTML tags from the input string using a regular expression
const stripTags = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, '');
};

// Select the appropriate option based on the selected value in a dropdown menu
const select = (selected, options) => {
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
};


// Helper for displaying an edit icon
const editIcon = (eventUser, loggedUser, eventId, floating = true) => {
  if (eventUser.toString() === loggedUser.toString()) {
    if (floating) {
      return `<a href="/events/edit/${eventId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit"></i></a>`;
    } else {
      return `<a href="/events/edit/${eventId}" class="btn blue btn-edit"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return '';
  }
};

module.exports = {
  formatDate,
  truncate,
  stripTags,
  select,
  editIcon,
};
