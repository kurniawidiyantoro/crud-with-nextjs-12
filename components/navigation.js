import { useRouter } from "next/router";
import {
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";

const Navigation = () => {
const router = useRouter()
  
  //Log Out
  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/login');
  };
  
  return (
    <Container fluid className="bg-dark">
      <Nav className=" bg-dark navbar py-2 container  ">
        <NavItem >
          <NavbarBrand href="/">
            <img
              alt="logo"
              src="/favicon.ico"
              style={{
                height: 40,
                width: 40,
              }}
            />
          </NavbarBrand>
        </NavItem>
        <NavItem >
          <NavLink active href="/" className=" text-white">
            Sales records
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink href="Customers-details" className="text-white">
            Customers details
          </NavLink>
        </NavItem>
        <NavItem className="ms-auto">
          <Button onClick={handleLogout} className="btn-link text-decoration-none text-white">
            Log Out
          </Button>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default Navigation;
