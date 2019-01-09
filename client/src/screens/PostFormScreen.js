import React, { Component } from 'react'
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostFormName from '../components/PostFormName'
import PostFormCategory from '../components/PostFormCategory'
import PostFormPrice from '../components/PostFormPrice'
import PostFormCondition from '../components/PostFormCondition'
import PostFormDescription from '../components/PostFormDescription'
import PostFormImage from '../components/PostFormImage'
import './PostFormScreen.css'
import { history } from '../routes/Routes'

export default class PostFormScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: window.localStorage.getItem('email'),
      categories: [],
      itemName: '',
      itemNameError: '',
      itemCategory: '',
      itemCategoryError: '',
      itemPrice: '',
      itemPriceError: '',
      itemCondition: '',
      itemConditionError: '',
      itemDescription: '',
      itemDescriptionError: '',
      itemImage: null,
      itemImageValue: '',
      itemImageError: '',
      validName: null,
      validCategory: null,
      validPrice: null,
      validCondition: null,
      validDescription: null,
    }
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(data => data.json())
      .then(results => {
        if (results !== undefined) {
          this.setState({
            categories: results,
          })
        }
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.validateCurrentState(e.target.name, e.target.value)
  }

  updateSelect = e => {
    this.setState({ itemCategory: e.target.value })
    if (e.target.value.length > 0) {
      this.setState({ validCategory: 'success' })
    } else {
      this.setState({ validCategory: 'error' })
    }
  }

  handleFileUpload = e => {
    this.setState({ itemImage: e.target.files })
  }

  inputIsValid(value) {
    if (value.match(/^[0-9a-zA-Z ]*$/) && value.length <= 40) return true
    else return false
  }

  validateCurrentState(name, value) {
    if (name === 'itemName') {
      if (value.length >= 1 && this.inputIsValid(value)) {
        this.setState({ validName: 'success' })
      } else {
        this.setState({ validName: 'error' })
      }
    }
    if (name === 'itemPrice') {
      if (value.length >= 1) {
        this.setState({ validPrice: 'success' })
      } else {
        this.setState({ validPrice: 'error' })
      }
    }
    if (name === 'itemCondition') {
      if (value.length >= 1 && this.inputIsValid(value)) {
        this.setState({ validCondition: 'success' })
      } else {
        this.setState({ validCondition: 'error' })
      }
    }
    if (name === 'itemDescription' && this.inputIsValid(value)) {
      if (value.length >= 1) {
        this.setState({ validDescription: 'success' })
      }
    }
  }

  validateSubmission = () => {
    let isError = false

    if (this.state.itemName.length <= 1) {
      isError = true
      this.setState({
        itemNameError: 'Identify the name of the item you are posting',
        validName: 'error',
      })
    } else {
      this.setState({ validName: 'success' })
    }

    if (this.state.itemCategory.length < 1) {
      isError = true
      this.setState({
        itemCategoryError: 'Category must be selected',
        validCategory: 'error',
      })
    } else {
      this.setState({ validCategory: 'success' })
    }

    if (this.state.itemPrice.length < 1) {
      isError = true
      this.setState({
        itemPriceError: 'Price must be defined',
        validPrice: 'error',
      })
    } else {
      this.setState({ validPrice: 'success' })
    }

    if (this.state.itemCondition.length <= 1) {
      isError = true
      this.setState({
        itemConditionError: 'Condition must be specified',
        validCondition: 'error',
      })
    } else {
      this.setState({ validCondition: 'success' })
    }

    if (this.state.itemImage === null) {
      isError = true
      this.setState({
        itemImageError: 'Image must be uploaded',
        validImage: 'error',
      })
    }

    if (this.state.itemDescription.length >= 1) {
      this.setState({ validDescription: 'success' })
    }
    return isError
  }

  addItemToDB() {
    let formData = new FormData()
    formData.append('email', this.state.user_name)
    formData.append('name', this.state.itemName)
    formData.append('category', this.state.itemCategory)
    formData.append('description', this.state.itemDescription)
    formData.append('price', this.state.itemPrice)
    formData.append('condition', this.state.itemCondition)
    formData.append('avatar', this.state.itemImage[0])

    fetch('/api/addItem/', {
      method: 'POST',
      body: formData,
    })
      .then(response => history.push('/myaccount'))
      .then(response => console.log(response))
      .catch(error => console.log('error'))
  }

  handleSubmit = e => {
    e.preventDefault()
    const err = this.validateSubmission()
    if (!err) {
      this.setState({
        itemName: '',
        itemNameError: '',
        itemCategory: '',
        itemCategoryError: '',
        itemPrice: '',
        itemPriceError: '',
        itemCondition: '',
        itemConditionError: '',
        itemDescription: '',
        itemDescriptionError: '',
        itemImage: '',
        itemImageValue: '',
        itemImageError: '',
        validName: null,
        validCategory: null,
        validPrice: null,
        validCondition: null,
        validDescription: null,
        validImage: null,
      })
      this.addItemToDB()
    }
  }

  render() {
    return (
      <div>
        <h1>Create a Post:</h1>
        <hr />
        <Grid>
          <Row>
            <Col sm={2} md={3} />
            <Col xs={12} sm={8} md={6} lg={6} id="form-container">
              <h3 id="disclaimer">
                Note: Posts may take up to 24 hours to be{' '}
                <strong>Approved</strong>
              </h3>
              <h4 className="reqNote">* Denotes required field</h4>
              <form>
                <PostFormName
                  value={this.state.itemName}
                  errorMsg={this.state.itemNameError}
                  valid={this.state.validName}
                  handleChange={this.handleChange}
                />
                <PostFormCategory
                  categories={this.state.categories}
                  value={this.state.itemCategory}
                  errorMsg={this.state.itemCategoryError}
                  valid={this.state.validCategory}
                  handleChange={this.updateSelect}
                />
                <PostFormPrice
                  value={this.state.itemPrice}
                  errorMsg={this.state.itemPriceError}
                  valid={this.state.validPrice}
                  handleChange={this.handleChange}
                />
                <PostFormCondition
                  value={this.state.itemCondition}
                  errorMsg={this.state.itemConditionError}
                  valid={this.state.validCondition}
                  handleChange={this.handleChange}
                />
                <PostFormDescription
                  value={this.state.itemDescription}
                  errorMsg={this.state.itemDescriptionError}
                  valid={this.state.validDescription}
                  handleChange={this.handleChange}
                />
                <PostFormImage
                  value={this.state.itemImage}
                  title={this.state.itemImageValue}
                  handleChange={this.handleFileUpload}
                  valid={this.state.validImage}
                  errorMsg={this.state.itemImageError}
                />
                <Row className="submit-row">
                  <Col xs={8} sm={9} md={9} />
                  <ButtonGroup className="button-group pull-right">
                    <Button
                      id="1"
                      type="submit"
                      componentClass={Link}
                      href="/"
                      to="/"
                      bsStyle="danger"
                    >
                      Cancel
                    </Button>
                    <Button
                      id="2"
                      type="submit"
                      onClick={e => this.handleSubmit(e)}
                      bsStyle="success"
                    >
                      Post
                    </Button>
                  </ButtonGroup>
                </Row>
              </form>
            </Col>
            <Col sm={2} md={3} />
          </Row>
        </Grid>
      </div>
    )
  }
}
