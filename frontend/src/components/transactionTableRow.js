
import React from "react";

const transactionTableRow = (props) => {
    const {  name1,name2, amount} = props.obj;
    console.log(name1,"name1")
    return (
        <tr className="text-white text-center">
            <td className="text-white text-center">{name1}</td>
            <td className="text-white text-center">{name2}</td>
            <td className="text-white text-center">{amount}</td>
        </tr>
    )
}

export default transactionTableRow;