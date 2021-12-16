const Button = ({label,onClick})=>{

    return <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-80"
    onClick={onClick}>
        {label}
    </button>

}

export default Button;