import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserTableRow from "./userTableRow";


const userList =()=>{
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users/')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    
    const DataTable = () => {
        
        return user.map((res,i)=>{
            return <UserTableRow obj={res} key={i} />
        });
    };
    return (
        <div className="table-wrapper">
            <Table striped bordered hover responsive  > 
                <thead className="text-white text-center bg-546A9E">
                    <tr >
                        <th className="text-white text-center bg-546A9E text-white">Name</th>
                        <th className="text-white text-center bg-546A9E text-white" >Email</th>
                        <th className="text-white text-center bg-546A9E text-white">Balance</th>
                        <th className="text-white text-center bg-546A9E text-white">Action</th>
                    </tr>
                </thead>
                <tbody className="text-whtie">{DataTable()}</tbody>
            </Table>
        </div>
    )
}
export default userList;