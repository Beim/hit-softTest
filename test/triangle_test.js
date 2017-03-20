const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const cases = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './triangle.yml')));

const app = require('../triangle/api.js');

for (let data of cases) {
  test(`triangle: ${data['in']} => ${data['out']}`, t => {
    const input = data['in'].split(' ').map(v => parseInt(v));
    t.is(app(...input), parseInt(data['out']));
  });
}
