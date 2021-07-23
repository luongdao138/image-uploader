const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');

const format64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { format64 };
