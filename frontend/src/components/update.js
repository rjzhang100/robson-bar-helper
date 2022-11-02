import { shouldForwardProp } from "@mui/styled-engine";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Update = () => {

    const [form, setForm] = useState({
        name: "",
        type: "",
        quantity: 0
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:8080/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found.`);
                navigate("/");
                return;
            }

            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        }); 
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEntry = {...form};
        await fetch(`http://localhost:8080/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedEntry),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        window.alert(`Successfully updated ${editedEntry.name}!`);
        navigate("/");
    }

    return (
        <div>  
        <h1>Add an Item</h1>
        <Form onSubmit = {onSubmit}>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Name of Item" onChange = {(e) => updateForm({name: e.target.value})}/>
            <Form.Text className="text-muted">
              Make sure it's spelt right! 
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Item Category</Form.Label>
            <Form.Control type="text" placeholder="Type of item e.g Red Wine, Bottled Beer, Syrup" 
                onChange = {(e) => updateForm({type: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Quantity of Item </Form.Label>
            <Form.Control type="number" placeholder="Enter quantity of item" 
                onChange = {(e) => updateForm({quantity: e.target.value})}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
        );
}; 
export default Update;

