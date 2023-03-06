import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  bank: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  color: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: Transaction;
  updateTransaction: Transaction;
};


export type MutationCreateTransactionArgs = {
  transaction: TransactionCreateRequest;
};


export type MutationUpdateTransactionArgs = {
  transaction: TransactionUpdateRequest;
};

export type Query = {
  __typename?: 'Query';
  getAccounts?: Maybe<Array<Account>>;
  getCategories?: Maybe<Array<Category>>;
  getTransaction?: Maybe<Transaction>;
  getTransactions?: Maybe<Array<Transaction>>;
};


export type QueryGetTransactionArgs = {
  id: Scalars['ID'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  categoryId: Scalars['ID'];
  currency: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
};

export type TransactionCreateRequest = {
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  categoryId: Scalars['ID'];
  currency: Scalars['String'];
  reference?: InputMaybe<Scalars['String']>;
};

export type TransactionUpdateRequest = {
  accountId: Scalars['ID'];
  amount: Scalars['Float'];
  categoryId: Scalars['ID'];
  currency: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  reference?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionCreateRequest: TransactionCreateRequest;
  TransactionUpdateRequest: TransactionUpdateRequest;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean'];
  Category: Category;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Transaction: Transaction;
  TransactionCreateRequest: TransactionCreateRequest;
  TransactionUpdateRequest: TransactionUpdateRequest;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  bank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, 'transaction'>>;
  updateTransaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'transaction'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccounts?: Resolver<Maybe<Array<ResolversTypes['Account']>>, ParentType, ContextType>;
  getCategories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  getTransaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryGetTransactionArgs, 'id'>>;
  getTransactions?: Resolver<Maybe<Array<ResolversTypes['Transaction']>>, ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};

