#!/usr/local/bin/node
const lunar = require('lunar-calendar');
const DateParser = require('date.js');

const cal = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const error = (msg) => {
  return {
    flag: 0,
    msg
  }
}

module.exports = (year, month, day) => {
  let nextDate, dayOfWeek, lunarDate;
  let isLeapYear;
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);
  if (!year || year > 2100 || year < 1900) 
    return error('Invaild Year, should be [1900, 2100]');
  if (!month || month < 0 || month > 12)
    return error('Invaild Month, should be [1, 12]');
  if (!day || day < 0 || day > 31)
    return error('Invaild Date, should be [1, 31]');
  if (year % 400 == 0 || (year % 4 == 0 && year % 100))
    isLeapYear = 1;
  else
    isLeapYear = 0;
  if (month == 2)
    if (day > cal[1][isLeapYear])
      return error(`Invaild Date, should [1, ${cal[1][isLeapYear]}]`);
  else
    if (day > cal[month - 1])
      return error(`Invaild Date, should [1, ${cal[month - 1]}]`);

  nextDate = DateParser("next day",  new Date(year, month - 1, day));
  dayOfWeek = nextDate.getDay();
  year = nextDate.getFullYear();
  month = nextDate.getMonth() + 1;
  day = nextDate.getDate();
  lunarDate = lunar.solarToLunar(year, month, day);

  return {
    gongli: {
      year,
      month,
      day,
      dayOfWeek
    },
    nongli: {
      year: lunarDate.lunarYear,
      month: lunarDate.lunarMonth,
      day: lunarDate.lunarDay,
    }
  }
}
