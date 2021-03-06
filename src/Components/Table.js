import { useState, useEffect } from "react";
import axios from "axios";
import Container from "./Container";

const Table = () => {
  const [results, setResults] = useState([]);
  const triggerText = 'Book';

  useEffect(() => {
    const request = async () => {
      const response = await axios.get("https://localhost:5001/api/resource?resourcesAmount=20");
      setResults(response.data);
    };
    request();
  }, []);
  const renderTableData = () => {
    return results.map((result) => {
      return (
        <tr key={result.id}>
          <td data-label="ResourceId">{result.id}</td>
          <td data-label="Name">{result.name}</td>
          <td data-label="Quantity">{result.quantity}</td>
          <td data-label="Book"> <Container triggerText={triggerText} resourceId={result.id} />
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table className="ui single line table">
        <thead>
          <tr>
            <th>ResourceId</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default Table;
