'use client';
import { useState, FormEvent } from 'react';
import styles from "./sgin-up.module.css";

interface FormData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

function SginUp() {
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/submit-form', { // Replace with API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Form submitted successfully!', data);
                setFormData({
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                    password: '',
                });
            } else {
                console.error('Error submitting form:', response.status);
                const errorData = await response.json();
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('There was an error sending the request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <button type="submit" className={styles.submit}>Submit</button>
        </form>
    );
}

export default SginUp;

