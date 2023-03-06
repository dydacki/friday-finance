import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Account, Category, Resolvers, Transaction, TransactionUpdateRequest } from './types'
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

const mockTransactionUpdate = (request: TransactionUpdateRequest): Transaction => {
  console.log('Transaction to be updated: ', JSON.stringify(request));
  return {
    accountId: request.accountId,
    amount: request.amount,
    categoryId: request.categoryId,
    currency: request.currency,
    date: request.date,
    id: request.id
  };
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
    getTransaction: (_, { id }) =>  transactions.find(t => t.id === id)
  },

  Mutation: {
    updateTransaction: (_, { transaction }) => mockTransactionUpdate(transaction)
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

// @ts-ignore - bug in TS, code working anyways.
const server = new ApolloServer(serverOptions);
const { url } = await startStandaloneServer(server, listenOptions);
console.log(`🚀  Server up and running at: ${url}`);