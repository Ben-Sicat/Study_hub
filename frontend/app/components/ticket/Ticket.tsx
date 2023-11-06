import React from "react";

function Ticket() {
  return (
    <div className=" items-center justify-center  bg-center bg-cover">
      <div className="max-w-md w-full h-full mx-auto z-10 bg-landing-bg rounded-3xl">
        <div className="flex flex-col">
          <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
            <div className="flex-none sm:flex">
              <div className=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
                <a
                  href="#"
                  className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </a>
              </div>
              <div className="flex-auto justify-evenly">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  my-1">
                    <span className="mr-3 rounded-full bg-white w-8 h-8"></span>
                    <h2 className="font-medium">Temporary Ticket</h2>
                  </div>
                  <div className="ml-auto text-blue-800">ASDASD</div>
                </div>
                <div className=" border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-5 h-5 bg-landing-bg -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-landing-bg -mt-2 -right-2"></div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1 ">MO</span>
                      <span>19 22</span>
                    </div>

                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                      ASD
                    </div>
                    <div className="text-xs">ASDASD</div>
                  </div>

                  <div className="flex flex-col mx-auto"></div>
                  <div className="flex flex-col ">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1">ASD</span>
                      <span>SAD</span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                      ASD
                    </div>
                    <div className="text-xs">ASD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
