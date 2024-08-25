export function capitalize(text: string) {
  return text.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
