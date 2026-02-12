import { Outlet } from 'react-router';

const GlobalLayout = () => {
  return (
    <div className="flex h-[100dvh] w-screen max-w-[40rem] min-w-[20rem] flex-1 flex-col overflow-hidden bg-white md:w-[28rem]">
      {/* TODO: 추후 수정 필요 */}
      <main className="scrollbar-hide relative flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default GlobalLayout;
