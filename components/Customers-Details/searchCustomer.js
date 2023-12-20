import { Form, InputGroup,Input,Button } from "reactstrap"

const SearchCustomer = ({search,setPage,setKeywords, setSearch}) => {

    const handleSearch = (e) => {
        e.preventDefault()
        setPage(1)
        setKeywords(search)
       }
  return (
    <Form onSubmit={handleSearch}>
    <InputGroup className="w-75">
      <Input value={search} placeholder="input name or city..." onChange={(e) => setSearch(e.target.value)} />
      <Button><i className="bi bi-search"></i></Button>
    </InputGroup>
  </Form>
  )
}

export default SearchCustomer