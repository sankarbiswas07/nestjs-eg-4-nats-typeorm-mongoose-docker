import cuid from 'cuid';

export function generateSkuId(): string {
  // Generate a cuid and extract a portion of it to fit the 8-character requirement
  const shortCuid = cuid().substring(1, 9);
  return shortCuid.toUpperCase(); // Optionally convert to uppercase
}
