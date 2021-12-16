
import Image from 'next/image'
import Button from '../components/Button'


const HomePage = () => {

  return <div className='flex flex-col gap-60 justify-center items-center content-between h-screen'>

    <p className='text-2xl'>PROJECT MULTI</p>

    <div className='flex flex-col gap-4'>
      <Button label="LOGIN" />
      <Button label="SIGNUP" />
    </div>


  </div>

}

export default HomePage



