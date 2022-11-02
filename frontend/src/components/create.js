import React, {useState} from "react";
import {useNavigate} from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Create = () => {
    const [form, setForm] = useState( {
        name: "",
        type: "",
        quantity: 0
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const newEntry = {...form};
        await fetch("http://localhost:8080/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({name: "", type: "", quantity: 0});
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
export default Create;