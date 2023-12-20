import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import { Container, Table, Row, Col } from "reactstrap";
import axios from "axios";
import SortingCustomers from "../components/Customers-Details/sortingCustomers";
import ReactPaginate from "react-paginate";
import SearchCustomer from "../components/Customers-Details/searchCustomer";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import HeadName from "../components/headName";
import Footer from "../components/footer";

const CustomersDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(1);
  const router = useRouter();
  const sortBy = [...customers];

  //fetch data API
  useEffect(() => {
    const dataCustomers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCustomers?search=${keywords}&&page=${page}`
        );

        setCustomers(response.data.customers);
        setKeywords(response.data.search);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalRows(response.data.totalRows);
        setLimit(response.data.limit);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };
    dataCustomers();
  }, [keywords, page]);

  //pagination
  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  //protected route
  const checkToken = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (!token) {
        window.location.replace("/login");
      } else {
        console.log("authorized");
      }
    } catch (error) {
      console.log("masuk ke error");
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
           <HeadName title='customers details'/>
      <Navigation />
      <Container className="p-0">
        <Row className="mx-1 mt-4 ">
          <Col>
            <h4 className="fw-bolder ">Customers Details</h4>
          </Col>
        </Row>
        <Row className="mx-1 mb-2">
          <Col>
            <SearchCustomer
              setPage={setPage}
              setKeywords={setKeywords}
              search={search}
              setSearch={setSearch}
            />
          </Col>
          <Col
            className="text-end 
        "
          >
            <SortingCustomers sortBy={sortBy} setCustomers={setCustomers} />
          </Col>
        </Row>
        <Row className="mx-1">
          <Col>
            <Table bordered className=" table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>City</th>
                  <th>Date of Create</th>
                </tr>
              </thead>
              <tbody>
                {!customers ? (
                  <Loading />
                ) : (
                  customers.map((datas, index) => (
                    <tr key={index}>
                      <th scope="row">{(page - 1) * limit + index + 1}</th>
                      <td>{datas.customer_name}</td>
                      <td>{datas.city}</td>
                      <td>{datas.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
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
      <Footer/>
    </div>
  );
};

export default CustomersDetails;

// export const getServerSideProps = async (context) => {
//   const { search = "", page = 1 } = context.query;

//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/getAllCustomers?search=${search}&page=${page}`
//     );

//     const { customers, totalPages, totalRows, limit } = response.data;

//     return {
//       props: {
//         customers,
//         keywords: search,
//         page: parseInt(page),
//         totalPages,
//         totalRows,
//         limit,
//       },
//     };
//   } catch (error) {
//     console.log("failed to fetch data", error);
//     return {
//       props: {
//         customers: [],
//         keywords: search,
//         page: parseInt(page),
//         totalPages: 1,
//         totalRows: 0,
//         limit: 1,
//       },
//     };
//   }
// };
