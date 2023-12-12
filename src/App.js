import { useState } from "react";
import { Card, Col, Container, Dropdown, FormControl, Row } from "react-bootstrap";


function App() {
  const [inValue, setInValue] = useState("");
  const [outValue, setOutValue] = useState("");

  const [selectedFromLanguage ,setSelectedFromLanguage] = useState("English");
  const [selectedToLanguage ,setSelectedToLanguage] = useState("Hindi");


  const [selectedFromLanguageCode ,setSelectedFromLanguageCode] = useState("en");
  const [selectedToLanguageCode ,setSelectedToLanguageCode] = useState("hi");

  function handleInChange(event) {
    // console.log(event.target.value);
    setInValue(event.target.value);
  }

  const languages = [
    {code:"en", name:"English"},
    {code:"hi", name:"Hindi"},
    {code:"ja", name:"Japanese"},
    {code:"zh", name:"Chinese"},
    
    
  ];


  function handleFromSelect(eventKey) {
    // console.log(eventKey);
    const selectedLang = languages.find(
      (language) => language.code === eventKey);

      setSelectedFromLanguage(selectedLang.name);
      setSelectedFromLanguageCode(selectedLang.code);
  }

  function handleToSelect(eventKey) {
    // console.log(eventKey);

    const selectedLang = languages.find(
      (language) => language.code === eventKey);

      setSelectedToLanguage(selectedLang.name);
      setSelectedToLanguageCode(selectedLang.code);
  }


  function handleKeyPress(event) {
    if(event.key === "Enter" && inValue.trim() !== ""){
        fetch(`https://api.mymemory.translated.net/get?q=${inValue}!&langpair=${selectedFromLanguageCode}|${selectedToLanguageCode}`)
        .then((res) => {
          return res.json();
        })
        .then((finalRes)=> {
          console.log(finalRes.responseData.translatedText );
          setOutValue(finalRes.responseData.translatedText  );
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <div className="App">
      <Container>
        <Card className="mt-5">
          <Card.Header>
            <h4 className="text-primary text-center">Translator app</h4>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col md={6} className="text-center ">
                <h6>Translate from: {selectedFromLanguage}</h6>

                {/* dropdown menu for from */}
                <Dropdown onSelect={handleFromSelect} className="mb-2">
                  <Dropdown.Toggle>{selectedFromLanguage}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* get languages from languages array using map */}
                   {languages.map((language) => {

                    // event key means what value select by user 
                    return <Dropdown.Item eventKey={language.code} key={language.code}>
                      {language.name}
                      </Dropdown.Item>
                   })}
                  </Dropdown.Menu>

                </Dropdown>

                <FormControl
                  as="textarea"
                  placeholder="Enter your text"
                  onChange={handleInChange}
                  onKeyPress={handleKeyPress}
                  value={inValue}
                >
                </FormControl>

              </Col>
              <Col md={6} className="text-center">
                <h6>Translate to: {selectedToLanguage}</h6>

                  {/* dropdown menu for to*/}
                  <Dropdown onSelect={handleToSelect} className="mb-2">
                  <Dropdown.Toggle>{selectedToLanguage}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* get languages from languages array using map */}
                   {languages.map((language) => {

                    // event key means what value select by user 
                    return <Dropdown.Item eventKey={language.code} key={language.code}>
                      {language.name}
                      </Dropdown.Item>
                   })}
                  </Dropdown.Menu>

                </Dropdown>


                <FormControl
                  as="textarea"
                  placeholder="Please wait"
                  value={outValue}>
                </FormControl>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;


// https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it