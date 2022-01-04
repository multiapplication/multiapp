const FormButton = ({text,setShow}) => {
    return (
        <button className="bg-transparent hover:bg-sky-900 text-white text-lg font-semibold hover:text-white py-2 px-4 border border-slate-300 hover:outline-1 rounded-full w-fit" onClick={() => setShow(true)}>
            {text}
        </button> 
    )
}

export default FormButton;