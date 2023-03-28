import React, { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import { NavLink } from "react-router-dom";

type Props = {
  setPage: (page: string) => void;
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

export default function TensorDog({ setPage }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [isHotDog, setIsHotDog] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleHotDogDetection = async () => {
    if (image) {
      setIsLoading(true); // start loading animation
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        "http://marcovrc2000.pythonanywhere.com/process_image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setIsHotDog(data.result);
      setIsLoading(false); // stop loading animation
    }
  };


  return (
    <motion.div
    className="flex flex-col h-auto"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-wrap justify-center flex-1 mt-16 sm:align-middle md:align-middle">
        <NavLink
          to="/projects"
          className="absolute top-24 left-12 bg-white text-black rounded-full shadow-md cursor-pointer transition-transform duration-200 w-10 h-10 flex items-center justify-center"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </NavLink>
  
        <div className="w-80 rounded-md m-4 bg-gray-100 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 p-6">
          <h2 className="text-2xl text-center font-bold mb-6 items-center">TensorDog</h2>
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="image-upload"
              className="hover:bg-gray-200 font-mono mb-8 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg border"
            >
              Select an image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected image"
                className="max-h-80 mb-2"
              />
            )}
            {!isHotDog && (
              <button
                onClick={handleHotDogDetection}
                disabled={!image || isLoading}
                className="hover:bg-gray-200 font-mono text-gray-600 bg-gray-300 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg border border-emerald-800"
              >
                Is it a HotDog?
              </button>
            )}
            {isLoading && (
              <div className="flex items-center font-mono font-semibold mt-4 justify-center">
                Analyzing image...
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="ml-2"
                >
                  🐾
                </motion.div>
              </div>
            )}
            {isHotDog !== null && !isLoading && (
              <button
                onClick={() => setIsHotDog(null)}
                className="hover:bg-gray-200 font-mono text-gray-600 bg-gray-300 font-semibold py-2 px-4 rounded-lg text-sm sm:text-base md:text-lg border border-emerald-800"
              >
                Try again
              </button>
            )}
          </div>
  
          {isHotDog !== null && (
            <p className="text-center font-mono text-gray-800 font-semibold mt-6">
              {isHotDog}
            </p>
          )}
        </div>
      </div>
    </div>
    </motion.div>
  );
          }