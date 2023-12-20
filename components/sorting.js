import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap"
import { useState } from "react";


const Sorting = ({sortBy, setSales}) => {
    const [sortOrder, setSortOrder] = useState("asc");

    const sortByName = () => {
        const sortedSales = sortBy;
        sortedSales.sort((a, b) =>
          sortOrder === "asc"
            ? a.customer_name.localeCompare(b.customer_name)
            : b.customer_name.localeCompare(a.customer_name)
        );
        setSales(sortedSales);
    
        // Toggle the sort order
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };

      const sortByQuantity = () => {
        const sortedSales = sortBy;
        sortedSales.sort((a, b) =>
          sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
        );
        setSales(sortedSales);
    
        // Toggle the sort order
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };


  return (
    <UncontrolledDropdown direction="down">
          <DropdownToggle caret size="m" color="dark">
            <i className="bi bi-funnel"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={sortByName}>
              {" "}
              sort by name{" "}
              <i
                className={
                  sortOrder === "asc"
                    ? "bi bi-sort-alpha-up"
                    : "bi bi-sort-alpha-down-alt"
                }
              ></i>
            </DropdownItem>
            <DropdownItem onClick={sortByQuantity}>
              {" "}
              sort by quantity{" "}
              <i
                className={
                  sortOrder === "asc"
                    ? "bi bi-sort-numeric-up"
                    : "bi bi-sort-numeric-down-alt"
                }
              ></i>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
  )
}

export default Sorting