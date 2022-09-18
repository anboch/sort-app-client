import { api } from '../../api'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function Todos() {
  const {
    isLoading,
    isError,
    data,
    error,
    refetch,
    isFetching,
    fetchStatus,
    status
  } = useQuery(['aaaaa'], () => api.requestConfirmCode('cloetboltpbn@mail.ru'), {
    enabled: false,
    staleTime: 0,
    cacheTime: 0
  })

  useEffect(() => {
    console.log('fetchStatus2:', fetchStatus)
    console.log('status2:', status)
  }, [fetchStatus, status])
  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <>
          data.........................
        </>
      ) : (
        isError ? (
          <span>Error: -------------</span>
        ) : (
          (isLoading && !isFetching) ? (
            <span>Not ready ...</span>
          ) : (
            <span>Loading...</span>
          )
        )
      )}

      <div>{isFetching ? 'Fetching...' : null}</div>
    </div>
  )
}