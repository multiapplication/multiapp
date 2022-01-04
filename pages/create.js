import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import FormButton from "../components/FormButton";

const CreatePage = () => {

    const [isShown, setIsShown] = useState(false)
    
    return (
        <>
        <div className="static h-screen bg-gradient-to-b from-cyan-900 to-green-500">
            <div className="object-left-top w-40 pt-6 pl-10">
                <img className="scale-150" src="/images/dropdown.png"></img>
            </div>
            <div className="absolute inset-x-0 top-52 h-16">
                <div className="grid grid-cols-1 gap-14 place-items-center">
                    <FormButton text={"Upper GI/HPB Radiology MDM"} setShow={setIsShown}></FormButton>
                </div>
            </div>
            <Transition
                show={isShown}
                enter="transition-opacity ease-linear duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog 
                    onClose={() => setIsShown(false)}
                    className="fixed z-10 inset-0 overflow-y-auto mt-32"
                >
                    <div className="flex items-center justify-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        <div className="relative bg-gray-100 rounded-lg w-9/12">

                                <div class="overflow-auto flex items-center">
                                    <div>
                                        <img src="/images/add_group.png" className=" mt-3 h-32"/>
                                    </div>
                                    <div>
                                        <p>TODO</p>
                                    </div>
                                </div>

                                <div class="overflow-auto flex items-center">
                                    <div>
                                        <img src="/images/add_individual.png" className=" mt-3 h-32"/>
                                    </div>
                                    <div>
                                        <p>TODO</p>
                                    </div>
                                </div>

                                <div class="overflow-auto flex items-center">
                                    <div>
                                        <img src="/images/calendar.png" className=" mt-3 h-32 ml-3"/>
                                    </div>
                                    <div>
                                        <p>TODO</p>
                                    </div>
                                </div>

                                <div class="overflow-auto flex items-center">
                                    <div>
                                        <img src="/images/notification.png" className=" mt-3 h-32 ml-3"/>
                                    </div>
                                    <div>
                                        <p>TODO</p>
                                    </div>
                                </div>

                                <div class="overflow-auto flex items-center">
                                    <div>
                                        <img src="/images/cut_off.png" className=" mt-3 h-32 -ml-4"/>
                                    </div>
                                    <div>
                                        <p>TODO</p>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>

        </>
    )
}
  
export default CreatePage
