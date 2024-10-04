import { useState } from "react";
import Input from "./components/Input";

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [outputImage, setOutputImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRemoveBg = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append("image_file", selectedImage);

        setLoading(true);

        try {
            const response = await fetch("https://api.remove.bg/v1.0/removebg", {
                method: "POST",
                headers: {
                    "X-Api-Key": "tHXZU2CW25YNUcwunupNkzUr",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Background removal failed");
            }

            const blob = await response.blob();
            const outputUrl = URL.createObjectURL(blob);
            setOutputImage(outputUrl);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[200vh] max-h-[400vh] md:h-screen w-screen overflow-y-auto flex md:items-center justify-center p-10 ">
            <div className="bg-bgLightGlass w-auto  p-6 md:pt-10 h-auto md:flex  absolute z-50 rounded-2xl backdrop-blur-2xl shadow-md">
                <div>
                    <h1 className="md:text-5xl xs:text-4xl font-avigea text-bgLight xs:text-center md:text-start md:ml-6 mb-4">Clear & Cut</h1>

                    <Input handleImageChange={handleImageChange} />

                    <div className=" flex justify-center mt-2 md:justify-end  pr-3" >
                        <button onClick={handleRemoveBg} className="group group-hover:before:duration-500 font-creatobold group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg" disabled={!selectedImage || loading} > {loading ? "Removing..." : "Remove Background"} </button>
                    </div>
                </div>

                <div className="flex flex-col md:block items-center" >
                    {selectedImage && (
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className=" max-w-72 md:max-w-52 mt-8 md:mt-20  mb-4 rounded-xl" />
                    )}
                    {outputImage && (
                        <div className="mt-4 md:relative">
                            {/* <h2 className="text-xl font-bold mb-2">Result:</h2>	 */}
                            <img src={outputImage} alt="Output" className="max-w-52 rounded-xl  " />

                            {/* Download Button */}
                            <a
                                href={outputImage}
                                download="output-image.png"
                                className="bg-bgLight p-3 font-creatobold absolute bottom-0 md:top-40 right-3 rounded-lg font-semibold "
                            >
                                Download Image
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Background Animation */}
            <div clasName="relative h-screen w-screen overflow-hidden " >
                <div className="fixed w-80 h-80 md:w-1/4  md:h-2/4 top-0 left-0 z-0 rounded-full blur-3xl xs:animate-xsPosMove md:animate-posMove bg-[#66347F]"></div>
                <div className="fixed w-80 h-80 md:w-1/4 md:-2/4 top-80 right-0 z-0 rounded-full blur-3xl xs:animate-xsNegMove md:animate-negMove bg-[#8CC0DE]"></div>
            </div>
        </div>
    );
}

export default App;
