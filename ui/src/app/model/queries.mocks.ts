import { signal } from '@angular/core';
import { CreateQueryResult } from '@tanstack/angular-query-experimental';

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
  } as unknown as Partial<CreateQueryResult<T, E>>);
