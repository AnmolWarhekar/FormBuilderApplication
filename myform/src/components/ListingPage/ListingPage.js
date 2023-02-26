import React, { useState, useEffect } from "react";
// import { useNavigate} from "react-router-dom";
import "./ListingPage.css"

const ListingPage = () => {
  const [forms, setForms] = useState([]);
  // const navigate = useNavigate()

  useEffect(() => {
    // Fetch forms from server and set state
    // Example using fetch API:
    fetch("/api/forms")
      .then((response) => response.json())
      .then((data) => setForms(data));
  }, []);

  return (
    <div>
      <h1>List of Forms</h1>
      <table>
        <thead>
          <tr>
            <th>Form Name</th>
            <th>Form URL</th>
            <th>Created At</th>
            <th>Total Responses</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.name}</td>
              <td><a href={`/forms/${form.id}`}>{form.url}</a></td>
              <td>{form.createdAt}</td>
              <td>{form.totalResponses}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <p  navigate to="/create-form">Create a new form</p> */}
    </div>
  );
};

export default ListingPage;
