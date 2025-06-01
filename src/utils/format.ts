export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}
