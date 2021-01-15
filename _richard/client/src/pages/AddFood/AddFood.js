import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FoodAPI from '../../utils/FoodAPI'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '95%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75%',
    },
    marginBottom: '2rem',
  },
  media: {
    height: 280,
  },
}))

const Project = (props) => {
  const classes = useStyles()

  const emptyState = {
    name: '',
    image: '',
    price: '',
    catagory: '',
    description: '',
  }

  const [addFoodState, setAddFoodState] = useState({
    name: '',
    image: '',
    price: '',
    catagory: '',
    description: '',
  })

  const checkState = () => {
    let keys = Object.keys(addFoodState)
    let len = keys.length
    for (let i = 0; i < len; i++) {
      if (addFoodState[keys[i]].length < 1) {
        return false
      }
    }
    return true
  }

  const isEnabled = checkState()

  const { createFood } = FoodAPI

  const handleInputChange = (event) => {
    setAddFoodState({
      ...addFoodState,
      [event.target.name]: event.target.value,
    })
  }

  const handlePriceChange = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1')
    let money = event.target.value.split('.')
    if (money.length > 1) {
      if (money[1].length > 2) {
        money[1] = money[1].slice(0, 2)
      }
      event.target.value = `${money[0]}.${money[1]}`
    }
    setAddFoodState({
      ...addFoodState,
      [event.target.name]: event.target.value,
    })
  }

  const handleCreateFood = (event) => {
    event.preventDefault()
    createFood({ ...addFoodState, price: parseFloat(addFoodState.price) })
    setAddFoodState({ ...emptyState })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          onChange={handleInputChange}
          value={addFoodState.name}
        />
        <TextField
          id="outlined-basic"
          label="Image"
          name="image"
          variant="outlined"
          onChange={handleInputChange}
          value={addFoodState.image}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          name="price"
          variant="outlined"
          onChange={handlePriceChange}
          value={addFoodState.price}
        />
        <TextField
          id="outlined-basic"
          label="Catagory"
          name="catagory"
          variant="outlined"
          onChange={handleInputChange}
          value={addFoodState.catagory}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          name="description"
          variant="outlined"
          onChange={handleInputChange}
          value={addFoodState.description}
        />
        <Button
          size="small"
          color="primary"
          onClick={handleCreateFood}
          disabled={!isEnabled}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  )
}

export default Project
