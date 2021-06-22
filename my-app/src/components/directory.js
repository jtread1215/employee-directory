import React, { component } from "react";
import employees from "./employees.js";
import search from "./search.js";
import api from "../utils/api";
import "../style/directory.css";

class directory extends component {
  state = {
    employees: [],
    empSort: [],
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


  sortEmployees = () => {
    let { employees, search } = this.state;
    let empSort = employees.filter((sorted) => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ empSort });
  };

  // grab search term, activate sorted
  startSort = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmp();
      this.setState({ sorted: true });
    });
  };

  render = () => {
    return (
      <div className="background">
        <div className="jumbotron jumbotron-fluid">
          <h2 className="display-4">Employee Directory</h2>
          <p> Search for an employee by entering their name or email below.</p>
          <search name="search" startSort={this.startSort} label="Search" />
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
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {
                // If user has not entered any search input, sort employees by UUID
                !this.state.sorted
                  ? this.state.employees.map((employee) => (
                      <employees
                        key={employee.id.value}
                        firstName={employee.name.first}
                        lastName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}
                        address={
                          employee.location.street.number +
                          " " +
                          employee.location.street.name +
                          ", " +
                          employee.location.city +
                          ", " +
                          employee.location.state +
                          " " +
                          employee.location.postcode
                        }
                      />
                    ))
                  : // sort users by UUID if the user has entered a search
                    this.state.empSort.map((employee) => (
                      <employees
                        key={employee.id.value}
                        firstName={employee.name.first}
                        lastName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}
                        address={
                          employee.location.street.number +
                          employee.location.street.name
                        }
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

export default directory;