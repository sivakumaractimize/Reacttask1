import React, { useEffect, useState } from "react";
import axios from 'axios';

const Crud = () => {
    const [data, setData] = useState([]);
// taken for update record purpose
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null); 

    // Fetch data from API
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("http://localhost:4000/todos")
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to handle adding data
    const handleAdd = () => {
        send({ name });
        setName('');
    };


    
    // Function to set the name in the input field when editing
    const handleEdit = (id, name) => {
        setName(name);
        setEditingId(id);
    };

    // Function to handle updating data
    const handleUpdate = (id) => {
        const url = `http://localhost:4000/todos/${id}`;
        if(name==='')
        {
            alert("please enter name")
        }
        else
        {
        axios.put(url, { name })
            .then(response => {
                console.log(response);
                getData();
                setEditingId(null); 
                setName('')
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        }
    };

    // Function to handle deleting data
    const handleDelete = (id) => {
        const url = `http://localhost:4000/todos/${id}`;
        axios.delete(url)
            .then(response => {
                console.log('Record deleted successfully');
                getData();
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };

    // Function to send data to the server
    const send = ({ name }) => {
        if(name==="")
        {
            alert("please enter the name")
        }
        else
        {
        let sendData = {
            name: name,
        };

        axios.post("http://localhost:4000/todos", sendData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Data sent successfully:', response.data);
            getData();
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    }
    }


    return (
        <>
            <h1>TO DO'S</h1>
            <div className="container mt-5 w-25">
                <div className="input-group">
                    <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {/* Add button */}
                    <button className="btn btn-primary" style={{ display: editingId ? 'none' : 'inline-block' }} onClick={handleAdd}>ADD</button>
                    {/* Update button */}
                    <button className="btn btn-success" style={{ display: editingId ? 'inline-block' : 'none' }} onClick={() => handleUpdate(editingId)}>Update</button>
                </div>
            </div>
    
            {/* Display fetched data */}
            {data.map((item, index) => (
                <table key={index} className="table mt-2">
                    <tbody className="Table">
                        <tr className="container border">
                            <td>{item.name}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => handleEdit(item.id, item.name)}>Edit</button>
                                <button className="btn" onClick={() => handleDelete(item.id)}>❌</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </>
    );
    
};

export default Crud;
