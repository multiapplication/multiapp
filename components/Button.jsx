const Button = ({label,onClick})=>{

    return <button className="bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-2xl w-80"
    onClick={onClick}>
        {label}
    </button>

}

export default Button;