export function processStyleKey(key: string) {
  const match = key.match(/([a-z][A-Z])/g);

  if (match != null) {
    match.forEach((item) => {
      const replaceValue = item[0] + "-" + item[1].toLowerCase();
      key = key.replace(item, replaceValue);
    });
  }

  return key;
}
