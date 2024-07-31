/** @format */

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ContentCardSkeleton() {
  return (
    <div className='w-60 h-[520px] rounded-lg border-violet-500 overflow-hidden '>
      <div className='relative pb-8 '>
        <Skeleton
          height={300}
          className='rounded-lg'
          enableAnimation='true'
          baseColor='silver'
          highlightColor='gray'
          direction='ltr'
        />
        <div className='w-16 h-16 rounded-full bg-white p-1 absolute bottom-0 z-30'>
          <div
            className='w-full h-full rounded-full flex items-center justify-center pb-1'
            style={{
              background: `conic-gradient(#22c55e 80%, white-20% )`,
            }}
          >
            <Skeleton circle={true} width={45} height={45} />
          </div>
        </div>
        <div className='flex gap-2 items-center justify-end text-white absolute bottom-10 right-2 max-w-36 flex-wrap'>
          <Skeleton
            width={50}
            enableAnimation='true'
            baseColor='silver'
            highlightColor='gray'
            direction='ltr'
          />
        </div>
      </div>
      <div className='py-2 text-lg text-white mt-2 px-2 flex flex-col'>
        <h2>
          <Skeleton
            enableAnimation='true'
            baseColor='silver'
            highlightColor='gray'
            direction='ltr'
          />
        </h2>
        <hr />
        <h3 className='text-gray-400'>
          <Skeleton
            enableAnimation='true'
            baseColor='silver'
            highlightColor='gray'
            direction='ltr'
          />
        </h3>
      </div>
    </div>
  );
}

export default ContentCardSkeleton;
