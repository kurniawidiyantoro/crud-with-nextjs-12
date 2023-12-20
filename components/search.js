import { Form, InputGroup,Input,Button } from "reactstrap"

const Search = ({search,setPage,setKeywords, setSearch}) => {

    const handleSearch = (e) => {
        e.preventDefault()
        setPage(1)
        setKeywords(search)
       }
  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <Input value={search} placeholder="input name or product name..." onChange={(e) => setSearch(e.target.value)} />
        <Button><i className="bi bi-search"></i></Button>
      </InputGroup>
    </Form>
  )
}

export default Search