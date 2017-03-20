const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const cases = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './nextdate.yml')));

const api = require('../nextdate/api.js');

for (let data of cases) {
  test(`nextdate: ${data['in']}`, t => {
    const input = data['in'].split(' ');
    const result = api(...input);
    if (data.flag !== undefined) {
      t.is(result.flag, data.flag);
    }
    else {
      if (data.g) {
        const [year, month, day] = data.g.split(' ');
        t.true(result.gongli.year == year);
        t.true(result.gongli.month == month);
        t.true(result.gongli.day == day);
      }
      if (data.n) {
        const [year, month, day] = data.n.split(' ');
        t.true(result.nongli.year == year);
        t.true(result.nongli.month == month);
        t.true(result.nongli.day == day);
      }
      if (data.d) {
        t.true(result.gongli.dayOfWeek == data.d);
      }
    }
  });
}
