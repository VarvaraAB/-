export function getNetworkAdress(ip: string, mask: string): string {
  const ipOctets = ip.split('.').map(Number);
  const maskOctets = mask.split('.').map(Number);
  const res: number[] = [];
  for (let i = 0; i < 4; i++) {
    res.push(ipOctets[i] & maskOctets[i]);
  }
  return res.join('.');
}
