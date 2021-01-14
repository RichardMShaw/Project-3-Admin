import { createContext } from 'react'

const FoodContext = createContext({
  food: '',
  foods: [],
  handleInputChange: () => {},
  handleAddFood: () => {},
  handleUpdateFood: () => {},
  handleDeleteFood: () => {},
})

export default FoodContext
