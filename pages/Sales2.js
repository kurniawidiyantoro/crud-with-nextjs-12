import { useMemo, useState,useEffect } from "react";
import { useReactTable } from "@tanstack/react-table";


const Sales2 = () => {
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

  const data = useMemo(() => sales,[])
  const columns = [
    {
        header: 'Customer',
        accessorKey: 'customer_name'
    },
    {
        header: 'Product Name',
        accessorKey: 'product_name'
    },
    {
        header: 'Quantity',
        accessorKey: 'quantity'
    },
  ]
const table = useReactTable({columns, data})
const {getHeaderGroups, get} = table;

  return (
  <div>
<table>
    {table.getHeaderGroups.map((header,index) => (
        <tr key={index}>
{header.headers}
        </tr>
    ))}
        <thead>
            <tr>
                <th>#</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
            </tr>
        </tbody>
    
</table>
  </div>)
};

export default Sales2;
