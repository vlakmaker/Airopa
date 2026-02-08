const COUNTRY_FLAGS: Record<string, string> = {
  Austria: '\u{1F1E6}\u{1F1F9}',
  Belgium: '\u{1F1E7}\u{1F1EA}',
  Bulgaria: '\u{1F1E7}\u{1F1EC}',
  Croatia: '\u{1F1ED}\u{1F1F7}',
  Cyprus: '\u{1F1E8}\u{1F1FE}',
  'Czech Republic': '\u{1F1E8}\u{1F1FF}',
  Denmark: '\u{1F1E9}\u{1F1F0}',
  Estonia: '\u{1F1EA}\u{1F1EA}',
  Finland: '\u{1F1EB}\u{1F1EE}',
  France: '\u{1F1EB}\u{1F1F7}',
  Germany: '\u{1F1E9}\u{1F1EA}',
  Greece: '\u{1F1EC}\u{1F1F7}',
  Hungary: '\u{1F1ED}\u{1F1FA}',
  Ireland: '\u{1F1EE}\u{1F1EA}',
  Italy: '\u{1F1EE}\u{1F1F9}',
  Latvia: '\u{1F1F1}\u{1F1FB}',
  Lithuania: '\u{1F1F1}\u{1F1F9}',
  Luxembourg: '\u{1F1F1}\u{1F1FA}',
  Malta: '\u{1F1F2}\u{1F1F9}',
  Netherlands: '\u{1F1F3}\u{1F1F1}',
  Poland: '\u{1F1F5}\u{1F1F1}',
  Portugal: '\u{1F1F5}\u{1F1F9}',
  Romania: '\u{1F1F7}\u{1F1F4}',
  Slovakia: '\u{1F1F8}\u{1F1F0}',
  Slovenia: '\u{1F1F8}\u{1F1EE}',
  Spain: '\u{1F1EA}\u{1F1F8}',
  Sweden: '\u{1F1F8}\u{1F1EA}',
  Europe: '\u{1F1EA}\u{1F1FA}',
};

export function getCountryFlag(country?: string): string {
  if (!country) return '\u{1F1EA}\u{1F1FA}';
  return COUNTRY_FLAGS[country] || '\u{1F1EA}\u{1F1FA}';
}
