import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  walletAddress: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: AuthResponse;
};


export type MutationSignInArgs = {
  input: SignInInput;
};

export enum Network {
  ArbitrumOne = 'ArbitrumOne',
  ArbitrumSepolia = 'ArbitrumSepolia',
  AvalancheMainnet = 'AvalancheMainnet',
  Development = 'Development',
  DevelopmentArb = 'DevelopmentArb',
  DevelopmentAva = 'DevelopmentAva',
  DevelopmentFil = 'DevelopmentFil',
  Mainnet = 'Mainnet',
  PolygonZkevmMainnet = 'PolygonZkevmMainnet',
  Sepolia = 'Sepolia',
  Staging = 'Staging',
  StagingArb = 'StagingArb',
  StagingAva = 'StagingAva'
}

export type PointHistoryModel = {
  __typename?: 'PointHistoryModel';
  earnedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  point: Scalars['Int']['output'];
  quest: QuestModel;
  questId: Scalars['String']['output'];
  referee?: Maybe<UserModel>;
  refereeUserId?: Maybe<Scalars['String']['output']>;
  roundNumber: Scalars['Int']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  pointHistories: Array<PointHistoryModel>;
  quests: Array<QuestModel>;
  user: UserModel;
  users: Array<UserModel>;
};


export type QueryPointHistoriesArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type QuestModel = {
  __typename?: 'QuestModel';
  chainId?: Maybe<Scalars['Int']['output']>;
  currencies?: Maybe<Array<Scalars['String']['output']>>;
  description: Scalars['String']['output'];
  endAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isHighlight: Scalars['Boolean']['output'];
  network?: Maybe<Network>;
  point: Scalars['Int']['output'];
  questType: QuestType;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
};

export enum QuestType {
  ActivePositions = 'ActivePositions',
  DailyLogin = 'DailyLogin',
  Deposit = 'Deposit',
  LimitOrders = 'LimitOrders',
  Referral = 'Referral'
}

export type SignInInput = {
  referralCode?: InputMaybe<Scalars['String']['input']>;
  signature: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  id: Scalars['String']['output'];
  joinedAt: Scalars['DateTime']['output'];
  loginBonusEarnedAt: Scalars['DateTime']['output'];
  point: Scalars['Int']['output'];
  pointDetails?: Maybe<Scalars['JSON']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  referralCode?: Maybe<Scalars['String']['output']>;
  referrer?: Maybe<UserModel>;
  referrerUserId?: Maybe<Scalars['String']['output']>;
  walletAddress: Scalars['String']['output'];
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
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Network: Network;
  PointHistoryModel: ResolverTypeWrapper<PointHistoryModel>;
  Query: ResolverTypeWrapper<{}>;
  QuestModel: ResolverTypeWrapper<QuestModel>;
  QuestType: QuestType;
  SignInInput: SignInInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserModel: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  PointHistoryModel: PointHistoryModel;
  Query: {};
  QuestModel: QuestModel;
  SignInInput: SignInInput;
  String: Scalars['String']['output'];
  UserModel: UserModel;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signIn?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
};

export type PointHistoryModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['PointHistoryModel'] = ResolversParentTypes['PointHistoryModel']> = {
  earnedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quest?: Resolver<ResolversTypes['QuestModel'], ParentType, ContextType>;
  questId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  referee?: Resolver<Maybe<ResolversTypes['UserModel']>, ParentType, ContextType>;
  refereeUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roundNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pointHistories?: Resolver<Array<ResolversTypes['PointHistoryModel']>, ParentType, ContextType, RequireFields<QueryPointHistoriesArgs, 'userId'>>;
  quests?: Resolver<Array<ResolversTypes['QuestModel']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserModel']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'limit' | 'page'>>;
};

export type QuestModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuestModel'] = ResolversParentTypes['QuestModel']> = {
  chainId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currencies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isHighlight?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['Network']>, ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  questType?: Resolver<ResolversTypes['QuestType'], ParentType, ContextType>;
  startAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModel'] = ResolversParentTypes['UserModel']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  loginBonusEarnedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pointDetails?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  referralCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referrer?: Resolver<Maybe<ResolversTypes['UserModel']>, ParentType, ContextType>;
  referrerUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  walletAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PointHistoryModel?: PointHistoryModelResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuestModel?: QuestModelResolvers<ContextType>;
  UserModel?: UserModelResolvers<ContextType>;
};



export const GetQuestsDocument = gql`
    query getQuests {
  quests {
    id
    questType
    title
    description
    point
    startAt
    endAt
    network
    chainId
    currencies
    isHighlight
  }
}
    `;

/**
 * __useGetQuestsQuery__
 *
 * To run a query within a React component, call `useGetQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuestsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuestsQuery, GetQuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestsQuery, GetQuestsQueryVariables>(GetQuestsDocument, options);
      }
export function useGetQuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestsQuery, GetQuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestsQuery, GetQuestsQueryVariables>(GetQuestsDocument, options);
        }
export function useGetQuestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetQuestsQuery, GetQuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestsQuery, GetQuestsQueryVariables>(GetQuestsDocument, options);
        }
export type GetQuestsQueryHookResult = ReturnType<typeof useGetQuestsQuery>;
export type GetQuestsLazyQueryHookResult = ReturnType<typeof useGetQuestsLazyQuery>;
export type GetQuestsSuspenseQueryHookResult = ReturnType<typeof useGetQuestsSuspenseQuery>;
export type GetQuestsQueryResult = Apollo.QueryResult<GetQuestsQuery, GetQuestsQueryVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    walletAddress
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    walletAddress
    point
    pointDetails
    referralCode
    referrer {
      id
      walletAddress
    }
    joinedAt
    rank
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($page: Int!, $limit: Int!) {
  users(page: $page, limit: $limit) {
    id
    walletAddress
    point
    rank
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables> & ({ variables: GetUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export type GetQuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestsQuery = { __typename?: 'Query', quests: Array<{ __typename?: 'QuestModel', id: string, questType: QuestType, title: string, description: string, point: number, startAt?: any | null, endAt?: any | null, network?: Network | null, chainId?: number | null, currencies?: Array<string> | null, isHighlight: boolean }> };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', token: string, walletAddress: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserModel', id: string, walletAddress: string, point: number, pointDetails?: any | null, referralCode?: string | null, joinedAt: any, rank?: number | null, referrer?: { __typename?: 'UserModel', id: string, walletAddress: string } | null } };

export type GetUsersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserModel', id: string, walletAddress: string, point: number, rank?: number | null }> };
