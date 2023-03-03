import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Account, Category, Resolvers, Transaction } from './types'
import { parseFromFile } from '../assets/shared/csvParser.js';

const dirName = (): string => {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(__filename);
}

const createSeedPath = (fileName: string): string => {
  return path.join(dirName(), '../', 'database', 'seed', fileName);
}

const createGraphPath = (): string => {
  return path.join(dirName(), 'schema.graphql');
}

const accounts: Account[] = parseFromFile<Account>(createSeedPath('accounts.csv'), ['id', 'name', 'bank']);
const categories: Category[] = parseFromFile<Category>(createSeedPath('categories.csv'), ['id', 'name', 'color']);
const transactions: Transaction[] = parseFromFile<Transaction>(createSeedPath('transactions.csv'), ['id', 'accountId', 'categoryId', 'reference', 'amount', 'currency', 'date']);
const typeDefs = readFileSync(createGraphPath(), { encoding: 'utf-8' });

const resolvers: Resolvers = {
  Query: {
    getAccounts: () => accounts,
    getCategories: () => categories,
    getTransactions: () => transactions,
    getTransaction: (_, id) => transactions.find(t => t.id === id)
  },
};

var listenOptions = {
  listen: { 
    port: 4000 
  },
};

var serverOptions = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};

const server = new ApolloServer(serverOptions);
const { url } = await startStandaloneServer(server, listenOptions);
console.log(`🚀  Server up and running at: ${url}`);