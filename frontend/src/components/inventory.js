import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.type}</td>
        <td>{props.record.quantity}</td>
    <td>
        <Link className="btn btn-link" to={`/update/${props.record._id}`}>Edit</Link>
        <button className="btn btn-link" 
            onClick = {() => {
                props.deleteRecord(props.record._id)
            }}>
                Delete
            </button>
    </td>
    </tr>
);

export default function Inventory() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8080/record`);

            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`
                window.alert(message);

                return;
            }
            
            const records = await response.json();
            setRecords(records);
        }

        getRecords();
        return;

    }, [records.length]);
    
    async function deleteRecord(id) {
        await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE",
        });

        const newRecord = records.filter((el) => el._id !== id);
        setRecords(newRecord);
    }

    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record = {record}
                    deleteRecord = {() => deleteRecord(record._id)}
                    key = {record._id}
                />
            );
        }); 
    }

    return (
        <div>
            <h1>Current Inventory</h1>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {recordList()}
                </tbody>
            </table>
        </div>
    );
}