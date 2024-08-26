import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TransactionTableRow from "./transactionTableRow";


const transactionList =()=>{
    const [user, setUser] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/users/transaction-history').then(({data})=>{
            setUser(data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    
    const DataTable = () => {
        
        return user.map((res,i)=>{
            return <TransactionTableRow obj={res} key={i} />
        });
    };
    
    return (
        <div className="table-wrapper">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th className="text-white text-center bg-546A9E text-white">From</th>
                        <th className="text-white text-center bg-546A9E text-white">To</th>
                        <th className="text-white text-center bg-546A9E text-white">Amount</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    )
}
export default transactionList;