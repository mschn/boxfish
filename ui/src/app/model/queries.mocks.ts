import { signal } from '@angular/core';
import {
  CreateMutationResult,
  CreateQueryResult,
} from '@tanstack/angular-query-experimental';

export const getQueryMock = <T, E>(
  mock: Partial<CreateQueryResult<T, E>> = {},
) =>
  ({
    data: undefined,
    dataUpdatedAt: signal(0),
    error: null,
    errorUpdateCount: signal(0),
    errorUpdatedAt: signal(0),
    failureCount: signal(0),
    failureReason: signal(new Error()),
    fetchStatus: signal('idle'),
    isError: signal(false),
    isFetched: signal(false),
    isFetchedAfterMount: signal(false),
    isFetching: signal(false),
    isInitialLoading: signal(false),
    isLoading: signal(false),
    isLoadingError: signal(false),
    isPaused: signal(false),
    isPending: signal(false),
    isPlaceholderData: signal(false),
    isRefetchError: signal(false),
    isRefetching: signal(false),
    isStale: signal(false),
    isSuccess: signal(true),
    refetch: undefined,
    status: signal('success'),
    ...mock,
  }) as CreateQueryResult<T, E>;

export const getLoadingQueryMock = <T, E>(
  mock: Partial<CreateQueryResult<T, E>> = {},
): CreateQueryResult<T, E> =>
  getQueryMock({
    ...mock,
    isError: signal(false),
    isLoading: signal(true),
    isSuccess: signal(false),
    data: signal(undefined),
  } as unknown as Partial<CreateQueryResult<T, E>>);

export const getMutationQueryMock = <T, E, V, C>(
  mock: Partial<CreateMutationResult<T, E, V, C>> = {},
) =>
  ({
    data: signal(undefined),
    error: null,
    variables: null,
    isError: signal(false),
    isPending: signal(false),
    isSuccess: signal(false),
    isIdle: signal(false),
    status: signal('success'),
    failureReason: signal(new Error()),
    isPaused: signal(false),
    failureCount: signal(0),
    mutate: () => {
      /** empty */
    },
    mutateAsync: null,
    reset: () => {
      /** empty */
    },
    context: signal({}),
    submittedAt: undefined,
    ...mock,
  }) as CreateMutationResult<T, E, V, C>;
