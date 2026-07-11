/** Formats an integer amount of KRW as, e.g., ₩345,000. */
export function formatKrw(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`;
}
