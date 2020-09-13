import React from 'react';
import './home.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      modalFlag: false,
      scrollStyle: "initialScroll",
      fontSize: "21",
      showFruits: false,
      showCars: false,
      fruitsList: [
        'Banana', 'Apple', 'Cherry', 'Orange', 'Peach'
      ],
      carsList: [
        'Volvo', 'Audi', 'BMW', 'Fiat', 'Saab'
      ]
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.resetModal = this.resetModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  openModal() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ modalFlag: true });
  }

  resetModal() {
    this.setState({ count: 0 });
    this.setState({ modalFlag: false });
  }

  closeModal() {
    this.setState({ modalFlag: false })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    window.onscroll = () => {
      if (window.pageYOffset !== 0) {
        const fontSize = window.pageYOffset / 5;
        this.setState({ fontSize: fontSize });
      }
    }
  }

  handleSelect(event) {
    if (event === "Cars") {
      this.setState({ carsList: this.state.carsList.sort() });
      this.setState({ showCars: true });
      this.setState({ showFruits: false });
    } else if (event === "Fruits") {
      this.setState({ fruitsList: this.state.fruitsList.sort() });
      this.setState({ showFruits: true });
      this.setState({ showCars: false });
    }
  }

  toggle() {
    if (this.state.showFruits) {
      this.setState({ fruitsList: this.state.fruitsList.reverse() })
    } else if (this.state.showCars) {
      this.setState({ carsList: this.state.carsList.reverse() })
    }
  }

  render() {
    return (
      <div onScroll={this.handleScroll}>
        <Button style={{ textAlign: "center", marginTop: "50px" }} variant="primary" onClick={this.openModal}>Open</Button>
        <Button style={{ textAlign: "center", marginTop: "50px", marginLeft: "25px" }} variant="danger" onClick={this.resetModal}>Reset</Button>
        <Modal style={{ marginTop: "100px" }} show={this.state.modalFlag} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Modal is clicked <b>{this.state.count}</b> number of times</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <DropdownButton
          alignRight
          style={{ marginTop: "50px" }}
          title="Select any value"
          id="dropdown-menu-align-right"
          onSelect={this.handleSelect}
          selected
        >
          <Dropdown.Item eventKey="Fruits">Fruits</Dropdown.Item>
          <Dropdown.Item eventKey="Cars">Cars</Dropdown.Item>
        </DropdownButton>
        {this.state.showFruits || this.state.showCars ?
          <div style={{ marginTop: "25px" }}>The default list is in Ascending order. Please click on toggle button to change it to descending Order
            <br /><Button style={{ marginTop: "5px" }} variant="secondary" onClick={this.toggle}>Toggle</Button></div> : null}
        {this.state.showFruits ?
          <div>
            Showing Results for Fruits
            <ul>
            {this.state.fruitsList.map(item => {
              return <li key={item}>{item}</li>;
            })}
          </ul> 
          </div>: null}
        {this.state.showCars ?
          <div>
            Showing Results for Cars
            <ul>
            {this.state.carsList.map(item => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          </div> : null}
        <div style={{ height: '850px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: this.state.fontSize + 'px' }}>Scroll to increase/decrease text</p>
        </div>
      </div>
    )
  }
}

export default Home;
