import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap"
import { useState } from "react";


const SortingCustomers = ({sortBy, setCustomers}) => {
    const [sortOrder, setSortOrder] = useState("asc");

    const sortByName = () => {
        const sortedCustomers = sortBy;
        sortedCustomers.sort((a, b) =>
          sortOrder === "asc"
            ? a.customer_name.localeCompare(b.customer_name)
            : b.customer_name.localeCompare(a.customer_name)
        );
        setCustomers(sortedCustomers);
    
        // Toggle the sort order
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };

      const sortByCity = () => {
        const sortedCustomers = sortBy;
        sortedCustomers.sort((a, b) =>
          sortOrder === "asc"
            ? a.city.localeCompare(b.city)
            : b.city.localeCompare(a.city)
        );
        setCustomers(sortedCustomers);
    
    
        // Toggle the sort order
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };


  return (
    <UncontrolledDropdown className="me-0" direction="down">
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
            <DropdownItem onClick={sortByCity}>
              {" "}
              sort by city{" "}
              <i
                className={
                  sortOrder === "asc"
                    ? "bi bi-sort-alpha-up"
                    : "bi bi-sort-alpha-down-alt"
                }
              ></i>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
  )
}

export default SortingCustomers