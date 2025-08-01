import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelMockApi';
import styles from './NewSpacecraft.module.css';
import { useSpacecrafts } from '../hooks/useSpacecrafts';

const NewSpacecraft = () => {
    const [form, setForm] = useState({
        name: '',
        capacity: '',
        description: '',
        pictureUrl: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spacecraft = {
            name: form.name,
            capacity: parseInt(form.capacity, 10),
            description: form.description,
            pictureUrl: form.pictureUrl.trim() ? form.pictureUrl : undefined,
        };

        const res = await SpaceTravelApi.buildSpacecraft(spacecraft);
        navigate('/spacecrafts');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>
                    Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={form.capacity}
                        onChange={handleChange}
                        required
                        min="1"
                        className={styles.input}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>
                    Description:
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className={styles.textarea}
                    />
                </label>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>
                    Picture URL (optional):
                    <input
                        type="url"
                        name="pictureUrl"
                        value={form.pictureUrl}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </label>
            </div>
            <button type="submit" className={styles.button}>
                Create Spacecraft
            </button>
        </form>
    );
};

export default NewSpacecraft;
