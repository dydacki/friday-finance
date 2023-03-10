import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Account, Category, Resolvers, Transaction, TransactionPage, TransactionUpdateRequest } from './types'
import { parseFromFile } from '../assets/shared/csvParser.js';
import { toAccountBrief, toCategoryBrief } from '../assets/shared/mappers/modelMappers.js';
import { DbTransaction } from '../assets/models/DbTransaction';
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
const dbTransactions: DbTransaction[] = parseFromFile<DbTransaction>(createSeedPath('transactions.csv'), ['id', 'accountId', 'categoryId', 'reference', 'amount', 'currency', 'date']);
const transactions: Transaction[] = dbTransactions.map(t => ({
  amount: t.amount,
  account: toAccountBrief(accounts.find(a => t.accountId === a.id)),
  category: toCategoryBrief(categories.find(c => t.categoryId === c.id)),
  currency: t.currency,
  date: t.date,
  id: t.id,
  reference: t.reference
}));

const typeDefs = readFileSync(createGraphPath(), { encoding: 'utf-8' });

const mockTransactionUpdate = (request: TransactionUpdateRequest): Transaction => {
  console.log('Transaction to be updated: ', JSON.stringify(request));
  return {
    account: toAccountBrief(accounts.find(a => request.accountId)),
    amount: request.amount,
    category: toCategoryBrief(categories.find(a => request.categoryId)),
    currency: request.currency,
    date: request.date,
    id: request.id
  };
}

const fetchTransactionBatch = (pageNo: number, pageSize: number): TransactionPage => {
  const startIndex: number = pageNo < 1 ? 0 : (pageNo - 1) * pageSize;
  let transactionBatch: Transaction[] = [];

  if (startIndex >= transactions.length) {
    if (transactions.length >= pageSize) {
      transactionBatch = transactions.slice(transactions.length - 1 - pageSize);
    } else {
      transactionBatch = transactions;
    }
  } else {
    transactionBatch = transactions.slice(startIndex);
    if (transactionBatch.length >= pageSize) {
      transactionBatch = transactionBatch.slice(0, pageSize);
    }
  }

  return {
    fromTransaction: startIndex + 1,
    toTransaction: startIndex + transactionBatch.length,
    totalTransactions: transactions.length,
    transactions: transactionBatch
  };
}

const resolvers: Resolvers = {
  Query: {
    getAccounts: () => accounts,
    getCategories: () => categories,
    getTransactions: (_, { pageNo }) => fetchTransactionBatch(pageNo, 15),
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