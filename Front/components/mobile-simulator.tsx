import { PropsWithChildren } from "react";

export function MobileSimulator({ children }: PropsWithChildren) {
  return (
    <div className='p-15 flex flex-col align-center justify-center gap-6 overflow-hidden'>
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[21px] rounded-[3.75rem] h-[900px] w-[450px]">
        <div className="h-[48px] w-[4.5px] bg-gray-800 dark:bg-gray-800 absolute -left-[25.5px] top-[108px] rounded-l-lg"></div>
        <div className="h-[69px] w-[4.5px] bg-gray-800 dark:bg-gray-800 absolute -left-[25.5px] top-[186px] rounded-l-lg"></div>
        <div className="h-[69px] w-[4.5px] bg-gray-800 dark:bg-gray-800 absolute -left-[25.5px] top-[267px] rounded-l-lg"></div>
        <div className="h-[96px] w-[4.5px] bg-gray-800 dark:bg-gray-800 absolute -right-[25.5px] top-[213px] rounded-r-lg"></div>
        <div className="rounded-[3rem] overflow-scroll w-[408px] h-[858px] bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  )
}