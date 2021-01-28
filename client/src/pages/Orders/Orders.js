import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import OrderAPI from '../../utils/OrderAPI'
import numberToMoney from '../../utils/lib/numberToMoney'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#faffe6',
  },
  food: {
    width: '30%',
  },
  orderInfo: {
    backgroundColor: '#fff3dd',
    marginTop: '1rem',
  },
  foodOrder: {
    backgroundColor: '#ffcccb',
    marginTop: '1rem',
  },
  centerText: {
    textAlign: 'center',
  },
  grid: {
    marginTop: '0.5rem',
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
      setOrdersState({ customerOrders: customerOrders })
    })
  }, [])
  return (
    <>
      <Card className={classes.header}>
        <Typography variant="h2" className={classes.centerText}>
          Orders
        </Typography>
      </Card>
      <Grid container xs={12} className={classes.grid}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          {ordersState.customerOrders.map((customerOrder, i) => (
            <Card key={i} className={classes.orderInfo}>
              <CardContent>
                <Typography variant="h6">
                  First Name: {customerOrder.firstName}
                </Typography>
                <Typography>Last Name: {customerOrder.lastName}</Typography>
                <Typography>Email: {customerOrder.email}</Typography>
                <Typography>Phone: {customerOrder.phone}</Typography>
                <Typography>Order #: {customerOrder.orderNumber}</Typography>
                <Typography>
                  Total: ${numberToMoney(customerOrder.total)}
                </Typography>
                <Typography>Orders:</Typography>
                {customerOrder.orders.map((order, j) => {
                  return (
                    <Card key={j} className={classes.foodOrder}>
                      <CardContent>
                        <Typography>
                          {order.foodName} x{order.amount}
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
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  )
}
export default Orders
