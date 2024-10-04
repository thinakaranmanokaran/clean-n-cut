import React from "react";

const Input = ({ handleImageChange }) => {
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative h-72  md:w-[35vw] rounded-2xl border-4 border-dashed border-bgLightGlass flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute flex flex-col items-center">
              <div className="text-[150px] text-bgLight -mt-20">+</div>
              <span className="block text-xl text-bgLight font-thin font-creatobold ">
                Drag &amp; drop your files here
              </span>
              <span className="block text-gray-400 font-creatobold mt-1">
                or click to upload
              </span>
            </div>

            {/* File Input */}
            <input
              name="file"
              className="h-full w-full opacity-0 cursor-pointer"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
