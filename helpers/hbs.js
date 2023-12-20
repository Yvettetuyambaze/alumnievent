// hbs.js

const moment = require('moment');

// Format the date in the specified format using the moment library
const formatDate = (date, format) => {
  return moment(date).utc().format(format);
};

// Truncate the input string to a specified length, adding ellipses if necessary
const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' ';
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(' '));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + '...';
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

const displayImage = (src, alt) => {
  console.log('Display Image Helper Called:', src, alt);
  return `<img src="${src}" alt="${alt}">`;
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
  displayImage,
  editIcon,
};
