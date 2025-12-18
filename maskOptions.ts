export interface MaskOption {
  cidr: number;
  mask: string;
  label: string;
}

// Генерируем маски от /0 до /32
export const MASK_OPTIONS: MaskOption[] = Array.from({ length: 33 }, (_, i) => {
  const cidr = i; // 0..32
  const binaryMask = '1'.repeat(cidr).padEnd(32, '0'); // 32 бита
  const octets: number[] = [];
  for (let k = 0; k < 4; k++) {
    const part = binaryMask.slice(k * 8, (k + 1) * 8);
    octets.push(parseInt(part, 2));
  }
  const mask = octets.join('.');
  return { cidr, mask, label: `/${cidr} (${mask})` };
});
