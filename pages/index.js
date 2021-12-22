import Router from "next/router";
import Button from "../components/Button";

const HomePage = () => {
  return (
    
    <div className="flex flex-row ">
      <div className="bg-green-400 h-screen w-1/3 flex flex-col content-between justify-center items-center">
      
        <p className="font-bold text-white">
          Fugiat nulla deserunt aute elit aute labore ad culpa enim cillum et
          labore ex non. Anim eu id nisi consequat cupidatat nisi esse
          cupidatat. Aliquip sint qui commodo non sint proident dolor laborum
          mollit duis incididunt minim proident. Et occaecat elit pariatur irure
          sunt non irure mollit sit.
        </p>

        
      </div>
      <div className="h-screen w-2/3 flex flex-col gap-60 justify-center items-center content-between ">
        <p className="text-3xl font-bold">PROJECT MULTI</p>

        <div className="flex flex-col gap-4">
          <Button label="LOGIN" onClick={() => Router.push("/login")} />
          <Button label="SIGNUP" onClick={() => Router.push("/signup")} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
