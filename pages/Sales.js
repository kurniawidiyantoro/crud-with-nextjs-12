import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import { Container } from "reactstrap";

const DataTableSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAllTransaction"
        );
        setSales(response.data);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Customer",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];

  return (
    <Container fluid className=" p-0 ">
      <Navigation/>
      <DataTable className="container" columns={columns} data={sales} pagination />
    </Container>
  );
};

export default DataTableSales;
