import { useState } from 'react';

const CreateSpacecraft = () => {
    const [form, setForm] = useState({
        name: '',
        capacity: '',
        description: '',
        pictureURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div>
            <h2>Create Spacecraft</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Capacity:
                        <input
                            type="number"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Picture URL (optional):
                        <input
                            type="url"
                            name="pictureURL"
                            value={form.pictureURL}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateSpacecraft;