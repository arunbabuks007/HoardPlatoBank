import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const userTableRow = (props) => {
    const { _id, name, email, amount } = props.obj;

    const deleteUser = () => {
        axios.delete(`http://localhost:4000/users/delete-user/${_id}`).then((res) => {
            if (res.status === 200) {
                alert("User successfully deleted");
                window.location.reload(); // Refresh the page to update the user list
            }
        }).catch((err) => {
            console.error("Error deleting user:", err);
            alert("Error deleting user.");
        });
    };
    
    const [user, setUser] = useState([]);
    const [formValues, setFormValues] = useState({ name1: name, name2: '', amount: '' });

    useEffect(() => {
        axios.get('http://localhost:4000/users/').then(({ data }) => {
            setUser(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const selectData = (event) => {
        setFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const selectAmount = (event) => {
        if (event.target.value > amount) {
            alert('Low Balance');
            window.location = "/";
        } else {
            setFormValues((prev) => ({
                ...prev,
                [event.target.name]: event.target.value
            }));
        }
    };

    const DataTable = () => {
        return user.map(category => (
            <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ));
    };

    const onSubmit = () => {
        if (!formValues.name2  || !formValues.amount) {
            if (!formValues.amount ) alert('Please enter the amount you want to send');
            if (!formValues.name2) alert("Please select receiver's name");
        } else if (formValues.name2 === formValues.name1) {
            alert("Sender and receiver can't be the same");
        } else {
            axios.post('http://localhost:4000/users/create-transaction', formValues).then(res => {
                if (res.status === 200) {
                    alert('Transaction Successful');
                    window.location = "/user-list";
                } else Promise.reject();
            }).catch(err => alert(err));
            handleClose();
        }
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <tr>
            <td className="text-white text-center">{name}</td>
            <td className="text-white text-center">{email}</td>
            <td className="text-white text-center">{amount}</td>
            <td className="text-center">
                <Button variant="primary" size='sm' onClick={handleShow}>
                    Transfer
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <div className="text-white bg-546A9E ">
                    <Modal.Header closeButton>
                        <div className="d-flex justify-content-center ">
                            <Modal.Title>Transaction Screen</Modal.Title>
                        </div>
                    </Modal.Header>
                    </div>
                    <div className="text-white background-colors">
                    <Modal.Body>
                        <div className="mb-2">Transfer to:</div>
                        <Form.Select name="name2" onChange={selectData} required>
                            <option>--none--</option>
                            {DataTable()}
                        </Form.Select>
                        <form>
                            <div className="mt-3 mb-2">
                                <label>Amount:</label>
                            </div>
                            <input type="number" name="amount" className="transaction-amount" onChange={selectAmount} required />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={onSubmit}>
                            Transfer
                        </Button>
                    </Modal.Footer>
                    </div>
                </Modal>

                <Button onClick={deleteUser} size='sm' variant="danger" className="delete-button">Delete</Button>
            </td>
        </tr>
    );
};

export default userTableRow;
