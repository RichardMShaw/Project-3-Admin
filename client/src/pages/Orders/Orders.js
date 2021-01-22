import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import OrderAPI from '../../utils/OrderAPI'
import numberToMoney from '../../utils/lib/numberToMoney'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  food: {
    width: '30%',
  },
}))

const { getOrders } = OrderAPI
const Orders = () => {
  const classes = useStyles()
  const [ordersState, setOrdersState] = useState({
    customerOrders: [],
  })

  useEffect(() => {
    getOrders().then(({ data: customerOrders }) => {
      console.log(customerOrders)
      setOrdersState({ customerOrders: customerOrders })
    })
  }, [])
  return (
    <div className={classes.root}>
      {ordersState.customerOrders.map((customerOrder, i) => (
        <Card key={i}>
          <CardContent>
            <Typography>First Name: {customerOrder.firstName}</Typography>
            <Typography>Last Name: {customerOrder.lastName}</Typography>
            <Typography>Email: {customerOrder.email}</Typography>
            <Typography>Phone: {customerOrder.phone}</Typography>
            <Typography>Order #: {customerOrder.orderNumber}</Typography>
            <Typography>Total: ${numberToMoney(customerOrder.total)}</Typography>
            <Typography>Orders:</Typography>
            {customerOrder.orders.map((order, j) => {
              return (
                <Card key={j}>
                  <CardContent>
                    <Typography>
                      Food: {order.foodName} x{order.amount}
                    </Typography>
                    <img
                      className={classes.food}
                      src={order.image}
                      alt={order.foodName}
                    />
                    {order.options.map((option) => {
                      let name = option.name.toLowerCase()
                      if (name === 'default') {
                        return ''
                      }
                      return (
                        <Typography>{`${option.name}: ${option.choiceName}`}</Typography>
                      )
                    })}
                  </CardContent>
                </Card>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default Orders
