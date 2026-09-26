import { useCallback, useEffect, useState } from 'react';

interface UseAsyncDataState<T> {
  data: T | undefined;
  loading: boolean;
  error: boolean;
  reload: () => void;
}

export function useAsyncData<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseAsyncDataState<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    fetcher()
      .then((res) => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadTick]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { data, loading, error, reload: () => setReloadTick((t) => t + 1) };
}
