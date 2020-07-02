import React, {useEffect, useState} from 'react';
import Card, { CardBody, CardText } from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from 'react-columns';
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const[latest,setLatest] = useState([]);
  const[results,setresults] = useState([]);
  const[searchCountry,setSearchCountry] = useState("");
  useEffect(() => {
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")
    ])
    .then(res=> {
      setLatest(res[0].data);
      setresults(res[1].data);
    })
    .catch(err =>
      {
        console.log(err);
      });
  } ,[]);


  const date = new Date(parseInt(latest.updated));
  const lastUpdated= date.toString();
  const filterCountry = results.filter(item => {
    return searchCountry!== "" ? item.country.toLowerCase().includes(searchCountry) : item;
  })


  const countries= filterCountry.map(data=>{
    return(
      <Card
      className='text-center' bg='light' text='dark' style={{margin:"10px"}}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} height="270"/>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>Deaths: {data.deaths}</Card.Text>
          <Card.Text>Recovered: {data.recovered}</Card.Text>
          <Card.Text>Today's Cases: {data.todayCases}</Card.Text>
          <Card.Text>Today's Deaths: {data.todayDeaths}</Card.Text>
        </Card.Body>
      </Card>

    );
  });
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  },{
    columns: 3,
    query: 'min-width: 1000px'
  }];


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <h3 className='text-center' style={{color:"white"}}> Covid-19 Tracker</h3>
        </Navbar.Brand>
      </Navbar>
      
      <CardDeck>
        <Card className='text-center' bg='secondary' text='white' style={{margin:"10px"}}>
          <Card.Body>
            <Card.Title>Coronavirus Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card className='text-center' bg='danger' text='white' style={{margin:"10px"}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
        <small>last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card className='text-center' bg='success' text='white' style={{margin:"10px"}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
  <Form>
    <Form.Group controlId="formPlaintextEmail">
      <Form.Label>
         Search
      </Form.Label>
        <Form.Control
        type="text" 
        placeholder="Search by Country"
        onChange={e=> setSearchCountry(e.target.value.toLowerCase())} />
    </Form.Group>
  </Form>
<Columns queries={queries}>
{countries}
</Columns>
    </div>
  );
}

export default App;
