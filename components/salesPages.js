import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Row, Col } from "reactstrap";
import Loading from "./loading";
import AddNewSales from "./addSales";
import DeleteSales from "./deleteSales";
import UpdateSales from "./updateSales";
import Sorting from "./sorting";
import Search from "./search";
import ReactPaginate from "react-paginate";

const SalesPages = () => {
  const [sales, setSales] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState(1);
  const [limit, setLimit] = useState(1);
  const sortBy = [...sales];

  //fetch data API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllTransaction?search=${keywords}&&page=${page}`
        );
        setSales(response.data.results);
        setKeywords(response.data.search);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalRows(response.data.totalRows);
        setLimit(response.data.limit);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };
    fetchData();
  }, [keywords, page]);

  //Pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <Container className="my-3">
      <Row>
        <Col xs={12} md={6}>
          <h4 className="fw-bolder">Sales Records</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={8} md={4} >
          <Search
            setPage={setPage}
            setKeywords={setKeywords}
            search={search}
            setSearch={setSearch}
          />
        </Col>
        <Col
          xs={4}
          md={8}
          className="text-end 
        "
        >
          <Sorting sortBy={sortBy} setSales={setSales} />
        </Col>
      </Row>
      <hr
        className="border border-2 border-black w-100
             text-center m-1"
      />
      <Row>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!sales ? (
                <Loading />
              ) : (
                sales.map((datas, index) => (
                  <tr key={index}>
                    <th scope="row">{(page - 1) * limit + index + 1}</th>
                    <td>{datas.customer_name}</td>
                    <td>{datas.product_name}</td>
                    <td>{datas.quantity}</td>
                    <td className="d-flex flex">
                      <UpdateSales datas={datas} />
                      <DeleteSales datas={datas} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddNewSales />
        </Col>
        <Col className="text-end">
          <p className="fs-6">
            page {page} of {totalPages} (Total Rows {totalRows})
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"< prev"}
            nextLabel={"next >"}
            pageCount={totalPages}
            breakLabel={"..."}
            containerClassName="pagination"
            pageLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            activeClassName="page-item active"
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SalesPages;
