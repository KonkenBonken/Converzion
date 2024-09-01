export function isKeyOfObject<T extends Record<string, any>>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

export function capitalize(text: string) {
  return text.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}