'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddEventForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        category: '',
        image: '', // Store image URL or file data
        description: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [imageMethod, setImageMethod] = useState('url'); // Tracks which method is selected ('url' or 'upload')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' })); // Clear error on input change
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: fileReader.result }));
                setIsFileSelected(true);
            };
            fileReader.readAsDataURL(file); // Converts image to base64 URL
        }
    };

    const handleImageMethodChange = (e) => {
        setImageMethod(e.target.value); // Sets which method (URL or upload) is active
        setFormData(prev => ({ ...prev, image: '' })); // Clears previously selected image
        setIsFileSelected(false); // Resets file selection state
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        const errors = {};
        Object.keys(formData).forEach(field => {
            if (!formData[field] && field !== 'image') {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        // Validate image field based on selected method (URL or file upload)
        if (imageMethod === 'url' && !formData.image) {
            errors.image = 'Image URL is required';
        }
        if (imageMethod === 'upload' && !formData.image && !isFileSelected) {
            errors.image = 'Image upload is required';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); // Set errors if validation fails
            return;
        }

        const newEvent = { id: Date.now(), ...formData };

        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = Array.isArray(storedEvents) ? [...storedEvents, newEvent] : [newEvent];

        localStorage.setItem('events', JSON.stringify(updatedEvents));
        router.push('/home');
    };

    return (
        <main className="bg-[#F4EEE0] min-h-screen p-6 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full flex flex-col gap-5">
                <h2 className="text-2xl font-bold mb-4 text-center">Add a New Event</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    onChange={handleChange}
                    className="input-style border outline-none px-2 py-2"
                />
                {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}

                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    className="input-style border outline-none px-2 py-2"
                />
                {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}

                <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                    className="input-style border outline-none px-2 py-2"
                />
                {formErrors.time && <p className="text-red-500 text-sm">{formErrors.time}</p>}

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="input-style border outline-none px-2 py-2"
                />
                {formErrors.location && <p className="text-red-500 text-sm">{formErrors.location}</p>}

                <select name="category" onChange={handleChange} className="input-style border outline-none px-2 py-2">
                    <option value="">Select Category</option>
                    <option value="Music">Music</option>
                    <option value="Food">Food</option>
                    <option value="Sports">Sports</option>
                    <option value="Networking">Networking</option>
                    <option value="Anime">Anime</option>
                </select>
                {formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>}

                {/* Image method selection (URL or upload) */}
                <div className="flex gap-4">
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            name="imageMethod"
                            value="url"
                            checked={imageMethod === 'url'}
                            onChange={handleImageMethodChange}
                        />
                        Image URL
                    </label>
                    <label className='flex items-center gap-1'>
                        <input
                            type="radio"
                            name="imageMethod"
                            value="upload"
                            checked={imageMethod === 'upload'}
                            onChange={handleImageMethodChange}
                        />
                        Upload Image
                    </label>
                </div>

                {/* Image URL input (visible if URL method is selected) */}
                {imageMethod === 'url' && (
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChange}
                        className="input-style border outline-none px-2 py-2"
                    />
                )}

                {/* File upload input (visible if Upload method is selected) */}
                {imageMethod === 'upload' && (
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Upload an Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2 px-4 py-2 border rounded-lg"
                        />
                        {isFileSelected && <p className="text-green-500 text-sm mt-2">File selected</p>}
                    </div>
                )}

                {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="input-style h-32 resize-none border outline-none px-2 py-2"
                ></textarea>
                {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}

                <button type="submit" className="mt-4 w-full bg-black text-[#F4EEE0] p-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add Event
                </button>
            </form>
        </main>
    );
}
