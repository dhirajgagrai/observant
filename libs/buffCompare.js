module.exports = (item1, item2) => {
  const buf1 = Buffer.from(item1);
  const buf2 = Buffer.from(item2);

  const result = Buffer.compare(buf1, buf2);

  return result;
};
