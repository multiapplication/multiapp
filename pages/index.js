import Router from 'next/router';
import Button from '../components/Button';

const HomePage = () => {

  return <div className='flex flex-col gap-60 justify-center items-center content-between h-screen'>

    <p className='text-2xl'>PROJECT MULTI</p>

    <div className='flex flex-col gap-4'>
      <Button label="LOGIN" onClick = {()=> Router.push('/login')}/>
      <Button label="SIGNUP" onClick = {() => Router.push('/signup')}/>
    </div>


  </div>

}

export default HomePage



