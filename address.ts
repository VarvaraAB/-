export function getAddressesCount(mask: string): number {
  let binaryMask = '';
  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  const ones = binaryMask.replace(/0/g, '').length;
  const zeros = 32 - ones;
  if (zeros === 0) return 1;
  if (zeros === 1) return 2;
  return Math.pow(2, zeros) - 2;
}
