import React from "react";

const employees = (props) => {

  function dateForm(date) {
    const arrDate = date.split("-");
    const yr = arrDate[0];
    const mon = arrDate[1];
    const dayArray = arrDate[2].split("T");
    const day = dayArray[0];
    const renderDate = [mon, day, yr].join("-");
    return renderDate;
  }

  let dOb = dateForm(props.dob);

  return (
    <tr className="tr">
      <td>
        <img alt={props.fName} src={props.icon} />
      </td>
      <td>
        {props.fName} {props.lName}
      </td>
      <td>{props.email}</td>
      <td>{props.phone} </td>
      <td>{dOb}</td>
      <td>{props.address}</td>
    </tr>
  );
};

export default employees;