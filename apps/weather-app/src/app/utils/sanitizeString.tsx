export default function sanitizeString(_string: string) {
  let string = _string;
  // Replace all HTML tags with an empty string
  string = string.replace(/<[^>]*>/g, '');
  // Replace all extra spaces with a single space
  string = string.replace(/\s+/g, ' ').trim();
  return string;
}
