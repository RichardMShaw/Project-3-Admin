import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FoodAPI from '../../utils/FoodAPI'
import CatagoryAPI from '../../utils/CatagoryAPI'
import { Typography } from '@material-ui/core'

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

const { createFood } = FoodAPI
const { createCatagory } = CatagoryAPI

const AddFood = (props) => {
  const classes = useStyles()

  const emptyState = {
    name: '',
    image: '',
    options: [
      {
        name: '',
        choices: [
          {
            name: '',
            price: '',
          },
        ],
      },
    ],
    catagory: '',
    description: '',
    lowestCost: '',
    highestCost: '',
  }

  const [addFoodState, setAddFoodState] = useState({
    name: '',
    image: '',
    options: [
      {
        name: '',
        choices: [
          {
            name: '',
            price: '',
          },
        ],
      },
    ],
    catagory: '',
    description: '',
    lowestCost: '',
    highestCost: '',
  })

  const [addCatagoryState, setAddCatagoryState] = useState({
    name: '',
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

  const checkCatagoryState = () => {
    return addCatagoryState.name.length > 0
  }

  const isAddCatagoryEnabled = checkCatagoryState()

  const isEnabled = checkState()

  const handleChoiceChange = (event, option, choice) => {
    let newState = addFoodState
    newState.options[option].choices[choice][event.target.name] =
      event.target.value
    setAddFoodState({ ...newState })
  }

  const handleAddChoice = (index) => {
    let newState = addFoodState
    newState.options[index].choices.push({
      name: '',
      choices: [
        {
          name: '',
          price: '',
        },
      ],
    })
    setAddFoodState({ ...newState })
  }

  const handleChangeCatagory = (event) => {
    setAddCatagoryState({ ...addCatagoryState, name: event.target.value })
  }

  const handleCreateCatagory = (event) => {
    createCatagory(addCatagoryState)
    setAddCatagoryState({ name: '' })
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

  const handleInputChange = (event) => {
    setAddFoodState({
      ...addFoodState,
      [event.target.name]: event.target.value,
    })
  }
  return (
    <Card className={classes.root}>
      <Typography>Add Food</Typography>
      <CardContent>
        <Card>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleInputChange}
              value={addFoodState.name}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Image"
              name="image"
              variant="outlined"
              onChange={handleInputChange}
              value={addFoodState.image}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {addFoodState.options.map((option, i) => (
              <CardContent>
                <CardContent>
                  {option.choices.map((choice, j) => (
                    <Card>
                      <CardContent>
                        <TextField
                          id="outlined-basic"
                          label="Choice"
                          name="name"
                          variant="outlined"
                          value={addFoodState.options[i].choices[j].name}
                          onChange={(event) => handleChoiceChange(event, i, j)}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Price"
                          name="price"
                          variant="outlined"
                          value={addFoodState.options[i].choices[j].price}
                          onChange={handlePriceChange}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleAddChoice(i)}
                  >
                    Add Choice
                  </Button>
                </CardContent>
              </CardContent>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Price"
              name="price"
              variant="outlined"
              onChange={handlePriceChange}
              value={addFoodState.price}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Catagory"
              name="catagory"
              variant="outlined"
              onChange={handleInputChange}
              value={addFoodState.catagory}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              onChange={handleInputChange}
              value={addFoodState.description}
            />
          </CardContent>
        </Card>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleCreateFood}
          disabled={true}
        >
          Add
        </Button>
      </CardContent>
      <Typography>Add Catagory</Typography>
      <CardContent>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          onChange={handleChangeCatagory}
          value={addCatagoryState.name}
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleCreateCatagory}
          disabled={!isAddCatagoryEnabled}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  )
}

export default AddFood
