import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Home: NextPage = () => {
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
    <>
      <Head>
        <title>TensorDog</title>
        <meta name="description" content="TensorDog" />
        <link rel="icon" href="/avatar.png" />

         
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">TensorDog</span> 
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold justify-center items-center text-center">What is this?</h3>
              <div className="text-lg text-justify p-2">
              When the stakes are this high, you should never trust your fallible human eyes. 
              Instead, use TensorDog, the revolutionary TensorFlow-powered app that is only fallible sometimes.
               Never again will you be plagued by the age-old question of whether a picture contains a hotdog or not. 
              </div>
            </div>
            <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold text-center">TensorDog    </h3>
          <div className="flex flex-col items-center mt-8">
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
                 {isHotDog !== null && (
            <p className="text-center font-semibold">
              {isHotDog}
            </p>
          )}
          </div>
  
            </div>
          </div>
        </div>
      </main>
    </>
    );
  };

export default Home;
