import { UsersIcon } from "@heroicons/react/outline";
import FadeIn from 'react-fade-in';
import Router from "next/router";
import Button from "../components/Button";

const HomePage = () => {
  return (
    
    <div className="flex flex-row ">
      <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-1/3 flex flex-col content-between justify-center items-center">
       <FadeIn delay={400}>
       <p className="text-white text-3xl ">Manage your MDMs with ease</p>
       </FadeIn>
      </div>


      <div className="h-screen w-2/3 flex flex-col justify-center items-center content-between ">
      <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] font-bold mb-24">Project Multi</h1>
      <img src="logo.svg" alt="multi logo" className="mb-20" width="200"></img>
        <div className="flex flex-col gap-4">
          <Button label="LOGIN" onClick={() => Router.push("/login")} />
          <Button label="SIGNUP" onClick={() => Router.push("/signup")} />
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;


