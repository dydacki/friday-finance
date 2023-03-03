import * as fs  from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Account, Category, Resolvers, Transaction } from './types'
import { parseFromFile } from '../assets/shared/csvParser.js';

const createSeedPath = (fileName: string): string => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../', 'database', 'seed', fileName);
}

const accounts: Account[] = parseFromFile<Account>(createSeedPath('accounts.csv'), ['id', 'name', 'bank']);
const categories: Category[] = parseFromFile<Category>(createSeedPath('categories.csv'), ['id', 'name', 'color']);
const transactions: Transaction[] = parseFromFile<Transaction>(createSeedPath('transactions.csv'), ['id', 'accountId', 'categoryId', 'reference', 'amount', 'currency', 'date']);

console.log('Transactions found: ', transactions.length)

// const resolvers: Resolvers = {
//   Query: 
// };