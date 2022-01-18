const Button = ({label,onClick})=>{

    return <button className="bg-[#57CC99] hover:bg-[#38A3A5] text-white font-bold py-2 px-4 rounded-2xl w-80"
    onClick={onClick}>
        {label}
    </button>

}

export default Button;