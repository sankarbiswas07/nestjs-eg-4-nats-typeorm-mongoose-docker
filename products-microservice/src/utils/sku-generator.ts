// import * as cuid from 'cuid';

export function generateSkuId(): string {
  // Generate a cuid and extract a portion of it to fit the 8-character requirement
  // const shortCuid = cuid().substring(1, 9);
  // return shortCuid.toUpperCase(); // Optionally convert to uppercase
  const time_stamp = Date.now()
  console.log(time_stamp);
  
  const sku = time_stamp.toString().substring(5, 13)
  console.log(sku)
  return sku
}
