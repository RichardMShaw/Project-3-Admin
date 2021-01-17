import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FoodAPI from '../../utils/FoodAPI'
import CatagoryAPI from '../../utils/CatagoryAPI'
import { InputLabel, MenuItem, Select, Typography } from '@material-ui/core'

import numberToMoney from '../../utils/lib/numberToMoney'

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
const { createCatagory, getCatagories, deleteCatagory } = CatagoryAPI

const AddFood = (props) => {
  const classes = useStyles()

  const emptyState = {
    name: '',
    image: '',
    catagory: '',
    description: '',
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
    lowestPrice: 0,
    highestPrice: 0,
  }

  const [addFoodState, setAddFoodState] = useState({
    name: '',
    image: '',
    catagory: '',
    description: '',
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
    lowestPrice: 0,
    highestPrice: 0,
  })

  const [addCatagoryState, setAddCatagoryState] = useState({
    name: '',
  })

  const [catagoryAPIState, setCatagoryAPIState] = useState({
    catagories: [],
  })

  const verifyAddFoodState = () => {
    let keys = Object.keys(addFoodState)
    let len = keys.length
    for (let i = 0; i < len; i++) {
      if (
        typeof addFoodState[keys[i]] != 'number' &&
        addFoodState[keys[i]].length < 1
      ) {
        if (keys[i] !== 'description') {
          return false
        }
      }
    }
    let options = addFoodState.options
    let optionsLen = options.length
    for (let i = 0; i < optionsLen; i++) {
      if (addFoodState.options[i].name === '') {
        return false
      }
      let choices = options[i].choices
      let choicesLen = choices.length
      for (let j = 0; j < choicesLen; j++) {
        if (choices[j].name === '') {
          return false
        }
      }
    }
    return true
  }

  const isAddFoodEnabled = verifyAddFoodState()

  const verifyCatagoryState = () => {
    let name = addCatagoryState.name
    if (name.length < 1) {
      return false
    }
    let catagories = catagoryAPIState.catagories
    let len = catagories.length
    for (let i = 0; i < len; i++) {
      if (catagories[i].name === name) {
        return false
      }
    }
    return true
  }

  const isAddCatagoryEnabled = verifyCatagoryState()

  const renderRemoveOptionButton = (index) => {
    if (index > 0) {
      return (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => handleRemoveOption(index)}
        >
          Remove Option
        </Button>
      )
    }
  }

  const renderRemoveChoiceButton = (option, choice) => {
    if (choice > 0) {
      return (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => handleRemoveChoice(option, choice)}
        >
          Remove Choice
        </Button>
      )
    }
  }

  const handleAddOption = () => {
    let newState = addFoodState
    newState.options.push({
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

  const handleRemoveOption = (index) => {
    let newState = addFoodState
    newState.options.splice(index, 1)
    setAddFoodState({ ...newState })
  }

  const handleOptionChange = (event, index) => {
    let newState = addFoodState
    newState.options[index][event.target.name] = event.target.value
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

  const handleRemoveChoice = (option, choice) => {
    let newState = addFoodState
    newState.options[option].choices.splice(choice, 1)
    setAddFoodState({ ...newState })
  }

  const handleChoiceChange = (event, option, choice) => {
    let newState = addFoodState
    newState.options[option].choices[choice][event.target.name] =
      event.target.value
    setAddFoodState({ ...newState })
  }

  const handleChoicePriceChange = (event, option, choice) => {
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
    let newState = addFoodState
    newState.options[option].choices[choice].price = event.target.value
    setAddFoodState({ ...newState })
    handleLowHighCost()
  }

  const handleChangeCatagory = (event) => {
    setAddCatagoryState({ ...addCatagoryState, name: event.target.value })
  }

  const handleInputChange = (event) => {
    setAddFoodState({
      ...addFoodState,
      [event.target.name]: event.target.value,
    })
  }

  const handleLowHighCost = () => {
    let lowest = 0
    let highest = 0
    let options = addFoodState.options
    let optionsLen = options.length
    for (let i = 0; i < optionsLen; i++) {
      let choices = addFoodState.options[i].choices
      let choicesLen = choices.length
      let price = addFoodState.options[i].choices[0].price
      if (price !== '') {
        price = parseFloat(price)
        let low = price
        let high = price
        for (let j = 1; j < choicesLen; j++) {
          if (price !== '') {
            price = parseFloat(addFoodState.options[i].choices[j].price)
            low = low > price ? (low = price) : low
            high = high < price ? (high = price) : high
          }
        }
        lowest += low
        highest += high
      }
    }

    setAddFoodState({
      ...addFoodState,
      lowestPrice: lowest,
      highestPrice: highest,
    })
  }

  const handleCreateFood = (event) => {
    event.preventDefault()
    let food = addFoodState
    let optionsLen = food.options.length
    for (let i = 0; i < optionsLen; i++) {
      let choicesLen = food.options[i].choices.length
      for (let j = 0; j < choicesLen; j++) {
        let price = parseFloat(food.options[i].choices[j].price)
        food.options[i].choices[j].price = isNaN(price) ? 0 : price
      }
      food.options[i].choices.sort((a, b) => (a.price > b.price ? 1 : -1))
    }
    createFood(food)
    setAddFoodState({ ...emptyState })
  }

  const handleCreateCatagory = (event) => {
    createCatagory(addCatagoryState)
    getCatagories()
      .then(({ data: catagories }) => {
        setAddCatagoryState({ name: '' })
        setCatagoryAPIState({ catagories: catagories })
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteCatagory = (id) => {
    deleteCatagory(id)
      .then(() => {
        getCatagories().then(({ data: catagories }) => {
          setCatagoryAPIState({ catagories: catagories })
        })
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getCatagories()
      .then(({ data: catagories }) => {
        setCatagoryAPIState({ catagories: catagories })
      })
      .catch((err) => console.log(err))
  }, [])

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
            <Typography>Options</Typography>
            {addFoodState.options.map((option, i) => (
              <Card>
                <CardContent>
                  <TextField
                    id="outlined-basic"
                    label="Option"
                    name="name"
                    variant="outlined"
                    value={addFoodState.options[i].name}
                    onChange={(event) => handleOptionChange(event, i)}
                  />
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
                          onChange={(event) =>
                            handleChoicePriceChange(event, i, j)
                          }
                        />
                      </CardContent>
                      {renderRemoveChoiceButton(i, j)}
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
                {renderRemoveOptionButton(i)}
              </Card>
            ))}
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <InputLabel id="catagory-label">Catagory</InputLabel>
            <Select
              labelId="catagory-label"
              id="demo-simple-select"
              name="catagory"
              value={addFoodState.catagory}
              onChange={handleInputChange}
            >
              {catagoryAPIState.catagories.map((catagory) => (
                <MenuItem value={catagory.name}>{catagory.name}</MenuItem>
              ))}
            </Select>
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
        <Card>
          <CardContent>
            <Typography>
              Lowest Cost: ${numberToMoney(addFoodState.lowestPrice)}
            </Typography>
            <Typography>
              Highest Cost: ${numberToMoney(addFoodState.highestPrice)}
            </Typography>
          </CardContent>
        </Card>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleCreateFood}
          disabled={!isAddFoodEnabled}
        >
          Add Food To Menu
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
        {catagoryAPIState.catagories.map((catagory) => (
          <Card>
            <CardContent>
              <Typography>{catagory.name}</Typography>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleDeleteCatagory(catagory._id)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

export default AddFood
