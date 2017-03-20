const [equilateral, isosceles, scalene, notATriangle] = [1, 2, 3, 4];

const main = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0 || a >200 || b > 200 || c > 200)
    return 0;
  if (a >= b + c || b >= a + c || c >= a + b)
    return notATriangle;
  if (a == b && a == c)
    return equilateral;
  if (a == b || a == c || b == c)
    return isosceles;
  return scalene;
};

module.exports = main;
