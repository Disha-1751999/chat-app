import Lottie from 'react-lottie'
import {animationDefaultOptions} from '@/lib/utils.js'


function EmptyContainer() {
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
        <Lottie
        isClickToPauseDisabled={true}
        width={200}
        height={200}
        options={animationDefaultOptions}
        />
        <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-3xl text-2xl transition-all duration-300 text-center'>
          <h4 className='poppins-medium'>
            Hi<span className='text-purple-500'>!</span>  Welcome to  <span className='text-purple-500'>Chat</span>App
            <span className='text-purple-500'>.</span>
          </h4>
        </div>
    </div>
  )
}

export default EmptyContainer