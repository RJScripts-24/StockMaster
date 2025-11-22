// shared/utils/csv.js
// CSV utility helpers (export & parsing)
// Uses json2csv for conversion
// Reference spec: /mnt/data/StockMaster.pdf

const { Parser } = require('json2csv');

/**
 * Convert an array of objects to CSV string
 * @param {Array} data - Array of JSON objects
 * @param {Array} fields - Optional array of field names; if omitted, fields auto-detected
 * @returns {string} CSV content
 */
function toCSV(data = [], fields = null) {
  if (!Array.isArray(data)) throw new Error('CSV export expects an array of objects');

  const opts = {};
  if (fields) opts.fields = fields;

  const parser = new Parser(opts);
  return parser.parse(data);
}

/**
 * Convert CSV string to array of objects
 * NOTE: Basic implementation; for heavy CSV parsing consider `csv-parse`
 */
function fromCSV(csvString = '') {
  if (typeof csvString !== 'string') throw new Error('CSV input must be a string');

  const lines = csvString.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] !== undefined ? cols[idx].trim() : null;
    });
    rows.push(obj);
  }

  return rows;
}

module.exports = { toCSV, fromCSV };