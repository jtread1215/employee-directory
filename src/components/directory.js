import React, { Component } from "react";
import Employees from "./employees.js";
import Search from "./search.js";
import api from "../utils/api";
import "../style/directory.css";

class Directory extends Component {
  state = {
    employees: [],
    employeeSort: [],
    search: "",
    sorted: false,
  };

  componentDidMount = () => {
    api.getUsers().then((results) => {
      this.setState({
        employees: results.data.results,
      });
    });
  };


  sortIndex = () => {
    let { employees, search } = this.state;
    let employeeSort = employees.filter((sorted) => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ employeeSort });
  };


  beginSort = (event) => {
    console.log(event.target.value);
    const filter = event.target.value;
    this.setState({ search: event.target.value }, () => {
      this.state.employees.filter(item => {
        let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
      });
      this.setState({ sorted: true });
    });
  };

  render = () => {
    return (
      <div className="bgColor">
        <div className="jumbotron jumbotron-fluid">
          <h2 className="h2">Employee Directory</h2>
          <p> Search for an employee by entering their name or email below.</p>
          <Search name="search" beginSort={this.beginSort} label="Search" />
        </div>

        <div className="container-fluid">
          <table className="table table-dark table-striped table-hover table-bordered table-condensed">
            <thead className="thead">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.state.sorted
                  ? this.state.employees.map((employee) => (
                      <Employees
                        key={employee.id.value}
                        fName={employee.name.first}
                        lName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}
                      />
                    )):
                    this.state.employeeSort.map((employee) => (
                      <Employees
                        key={employee.id.value}
                        fName={employee.name.first}
                        lName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}                        
                      />
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default Directory;