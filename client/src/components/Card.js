import React, { Component } from 'react'
import { Thumbnail } from 'react-bootstrap'
import ItemDetail from './ItemDetail'
import './Card.css'

export default class Card extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.viewContactForm = this.viewContactForm.bind(this)
    this.hideContactButton = this.hideContactButton.bind(this)
    this.showContactButton = this.showContactButton.bind(this)

    this.state = {
      show: false,
      showForm: false,
      showButton: true,
    }
  }

  handleClose() {
    this.setState({
      show: false,
      showForm: false,
    })
    this.showContactButton()
  }

  handleShow() {
    this.setState({ show: true })
  }

  viewContactForm() {
    this.setState({ showForm: true })
    this.hideContactButton()
  }

  showContactButton() {
    this.setState({ showButton: true })
  }

  hideContactButton() {
    this.setState({ showButton: false })
  }

  render() {
    const { item } = this.props
    return (
      <div>
        <div key={item.id}>
          <Thumbnail
            src={item.image_path}
            alt="Thumbnail"
            onClick={this.handleShow}
          >
            <h4 className="item-name">{item.name}</h4>
            {item.description}
            <h3 className="item-price">${item.price}</h3>
          </Thumbnail>
        </div>
        <ItemDetail
          name={item.name}
          image={item.image_path}
          price={item.price}
          created_at={item.created_at}
          description={item.description}
          condition={item.condition}
          show={this.state.show}
          showForm={this.state.showForm}
          showButton={this.state.showButton}
          hideContactButton={this.hideContactButton}
          viewForm={this.viewContactForm}
          onHide={this.handleClose}
          email={item.email}
        />
      </div>
    )
  }
}
