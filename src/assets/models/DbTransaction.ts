export interface DbTransaction {
  accountId: string;
  amount: number;
  categoryId: string;
  currency: string;
  date: string;
  id: string;
  reference?: string;
}