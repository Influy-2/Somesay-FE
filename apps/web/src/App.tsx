import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appRouter } from '@/routes/index';
import { RouterProvider } from 'react-router';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, //TODO: 에러 바운더리 추가 필요
      retry: 1, // 요청 실패 → 1초 후 재시도 → 에러 표시
      staleTime: 1000 * 60 * 5, // 5분 — 데이터를 fresh로 간주하는 시간
      gcTime: 1000 * 60 * 30, // 30분 — 비활성 캐시 유지 시간 (v5부터 cacheTime → gcTime)
      refetchOnWindowFocus: false, // 탭 전환 시 자동 refetch 끄기
      refetchOnReconnect: true, // 네트워크 재연결 시 refetch
      refetchOnMount: true, // 컴포넌트 마운트 시 stale이면 refetch
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
}

export default App;
