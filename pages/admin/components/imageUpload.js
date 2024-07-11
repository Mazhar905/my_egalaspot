import { useState } from 'react';

const ImageUpload = ({ onFilesSelected , errorCheck , totalImages }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        console.log("images when capture");



        

        const files = Array.from(event.target.files);
        const maxFiles = 10; // Maximum number of files allowed
        const maxSize = 5 * 1024 * 1024; // Maximum file size in bytes (5 MB)
        const validExtensions = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif'];

        if (files.length > maxFiles) {
            setError(`You can upload a maximum of ${maxFiles} images.`);
            return;
        }

        for (const file of files) {
            if (!validExtensions.includes(file.type)) {
                setError('Only PNG, JPG, SVG, WEBP, and GIF files are allowed.');
                return;
            }

            if (file.size > maxSize) {
                setError('Each file must be less than 5 MB.');
                return;
            }
        }

        setError('');
        const newFiles = [...selectedFiles, ...files];
        setSelectedFiles(newFiles);
        onFilesSelected(newFiles);
    };

    return (
        <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Images</h6>
            <div className={`${errorCheck ? "border-red-500 border-2" : ""} bg-gray-50 rounded-lg py-2 w-full`}>
                <div className="w-full flex flex-wrap lg:w-12/12 px-4 py-3">
                    {selectedFiles.map((file, index) => (
                        <div className="min-w-32 w-1/4 h-32 mt-3 flex items-center p-1">
                            <img key={index} src={URL.createObjectURL(file)} alt="Selected" className="px-2 py-3 border-gray-200 border-2 h-32 w-full object-contain rounded" />
                        </div>
                    ))}
                    <div className="min-w-32 w-1/4">
                        <label className="mt-3 bg-white mx-1 text-gray-500 font-semibold text-base rounded max-w-md h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                            </svg>
                            Upload file
                            <input type="file" className="hidden" multiple onChange={handleFileChange} />
                        </label>
                    </div>
                    <p className={`${errorCheck ? "text-red-500" : ""} w-full text-xs mt-3 px-1 font-medium text-gray-400`}>PNG, JPG, SVG, WEBP, and GIF are Allowed.</p>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}

        </div>
    );
};

export default ImageUpload;
