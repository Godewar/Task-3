import React, { useState } from 'react';
import axios from 'axios';

const PostDataTask = () => {
    const [phonenumber, setPhoneNumber] = useState('');
    const [headerData, setHeaderData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST data to the API
            const response = await axios.post(
                'https://chimpu.online/api/post.php',
                { phonenumber },
                { validateStatus: () => true } // To handle non-2xx responses
            );
            
            // Access and display the response headers
            setHeaderData(response.headers);
            setErrorMessage(null);
        } catch (error) {
            console.error('Error posting data:', error);
            setErrorMessage('Failed to post data. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Post Data to API</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                        width: '80%',
                        maxWidth: '400px',
                    }}
                    required
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Submit
                </button>
            </form>
            {headerData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Response Headers</h2>
                    <pre
                        style={{
                            textAlign: 'left',
                            display: 'inline-block',
                            backgroundColor: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    >
                        {JSON.stringify(headerData, null, 2)}
                    </pre>
                </div>
            )}
            {errorMessage && (
                <p style={{ color: 'red', marginTop: '20px' }}>{errorMessage}</p>
            )}
        </div>
    );
};

export default PostDataTask;
