import validator from 'validator';

/**
 *  return a message about error
 *
 * @param {string} source
 * @param {array} params
 * @returns {string}
 */
function format(source, params) {
  return params.reduce((message, value, index) => message.replace(new RegExp(`\\{${index}\\}`, 'g'), value), source);
}

const messages = {
  required: '{0} is required.',
  remote: 'Please fix this field.',
  email: 'Please enter a valid email address.',
  url: 'Please enter a valid URL.',
  date: 'Please enter a valid date.',
  number: 'Please enter a valid number.',
  digits: 'Please enter only digits.',
  equalTo: 'Please enter the same value again.',
  maxlength: 'Please input max {0} characters.',
  minlength: 'Please enter at least {0} characters.',
  rangelength: 'Please enter a value between {0} and {1} characters long.',
  range: 'Please enter a value between {0} and {1}.',
  max: 'Please enter a value less than or equal to {0}.',
  min: 'Please enter a value greater than or equal to {0}.',
};

/**
 *
 *
 * @export function
 * @param {string} input
 * @returns {string}
 */
export function validateRequired(input) {
  if (validator.isEmpty(input)) {
    return messages.required;
  }
  return '';
}

export function validateTitle(title) {
  if (validator.isEmpty(title)) {
    return format(messages.required, ['Title']);
  }
  if (validator.isLength(title, { min: 256 })) {
    return format(messages.maxlength, [255]);
  }
  return '';
}
