import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import ImgCard from "./components/ImgCard";
import Wrapper from "./components/Wrapper";
import "./App.css";

let clicked = [];
const images = ["arthas","garrosh","guldan","jaina","jaraxxus","maiev", "malfurion", "ragnaros", "sylvanas","thrall","tyrande","uther"]

class App extends React.Component {
  state = {
    images: images,
    clicked: clicked,
    currscore: 0,
    topscore: 0,
    message: "Click an Image to begin"
  };


  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  play = (id) =>{
    if (this.state.clicked.indexOf(id) === -1) {
      clicked.push(id);
      this.setState({clicked: clicked});
      this.setState({currscore: this.state.currscore + 1}, () => {
        if (this.state.currscore > this.state.topscore) {
          this.setState({topscore:this.state.currscore});
        }
      });
      this.setState({message:"You guessed correctly!"})
      this.setState({images: this.shuffle(images)})
    }
    else {
      clicked = [];
      this.setState({clicked: []});
      this.setState({currscore: 0}) 
      this.setState({message:"You guessed incorrectly!"})
      this.setState({images: this.shuffle(images)})
    }
  }

  render(){
    const imagecards = this.state.images.map((image, index) =>
    <ImgCard
    key={index}
    id = {image}
    image={process.env.PUBLIC_URL + '/images/'+ image +".png"}
    play={this.play}
    />
    )
    
    return (
      <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <Navbar bg="dark" variant="dark">
        <Navbar.Collapse className="justify-content-between">
        <Navbar.Brand>Clicky Game</Navbar.Brand>
          <Navbar.Text>
          <h3>{this.state.message}</h3>
          </Navbar.Text>
          <Navbar.Text>
          <h3>Score: {this.state.currscore} | Top Score: {this.state.topscore}</h3>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      {/* <Nav className="bg-primary justify-content-between">
        <Nav.Item>
          <h2><strong>Clicky Game</strong></h2>
        </Nav.Item>
        <Nav.Item>
          <h3>{this.state.message}</h3>
        </Nav.Item>
        <Nav.Item>
          <h3>Score: {this.state.currscore} | Top Score: {this.state.topscore}</h3>
        </Nav.Item>
      </Nav> */}
      <Wrapper>
        {imagecards}
      </Wrapper>
      </div>
    );
  }
}

export default App;
