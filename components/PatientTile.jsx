import Link from "next/link";
import  Router  from "next/router";

export const PatientTile = ({
  firstName,
  lastName,
  gender,
  age,
  description,
  doctorsAttending,
  onClick
}) => {

    
  return (
    
      <div className="rounded-xl shadow-md bg-white cursor-pointer hover:bg-gray-100" onClick={onClick}>
        <div className="px-4">
          <div className="text-xl font-bold">
            {firstName} {lastName}
          </div>
          <div className="text-lg">
            {age} {gender}
          </div>
        </div>
        <div className="p-4">{description}</div>
        <div className="px-4 py-2 opacity-50">{doctorsAttending}</div>
      </div>
    
  );
};

