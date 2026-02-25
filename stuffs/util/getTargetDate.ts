export function getTargetDate(yearsAgo: number) {
  const target = new Date();
  target.setFullYear(target.getFullYear() - yearsAgo);
  target.setSeconds(59);
  return { target };
}

export function toUnixSeconds(d: Date) {
  return Math.floor(d.getTime() / 1000);
}