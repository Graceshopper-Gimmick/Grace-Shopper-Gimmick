import React from 'react'
import { connect } from 'react-redux'
import { fetchHistory } from '../store/history'
// import { removeProduct } from '../store/cart'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const styles = (theme) => ({
    card: {
        // minWidth:1000,
        // maxHeight:200,
        margin: 16,
        // backgroundColor:'#fcd734'
    },
    purchase: {
        margin: theme.spacing(1),
        //minWidth: 120,
        minWidth: '80vw',
        maxHeight: 200,
        display: 'flex',
        //maxWidth: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: '#fcd734',
        backgroundColor: 'white',
        //border:'solid 10px #0d47a1',
    },

    image: {
        width: 80,
        height: 80,
        margin: 10,
        border: 'solid 4px black',
    },

    select: {
        maxWidth: 75,
        maxHeight: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    heading: {
        margin: '16px 0 0 32px',
        fontSize: 48,
    },
    submit: {
        maxWidth: 50,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    productName: {
        flexGrow: 4,
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    quantityContainer: {
        marginTop: '-50px',
    },
})



class UserHistory extends React.Component {
    async componentDidMount() {
        const history = await this.props.fetchHistory(this.props.auth.id);
        console.log(this.props);
        // console.log(history);
        
        //console.log('userHistory array of products', orderArray);
    }
    // <div key={order.product.id}>
    //                          <img src={order.product.thumbnailImgUrl} />                            
    //                          <h2>{order.product.name}</h2>
    //                          <h4>{order.product.price}</h4>
    //                      </div>
    render() {
        const { classes, theme, submitCart } = this.props
        
        const cartArray = this.props.userHistory.length ? this.props.userHistory : [];    
        console.log('CART',cartArray)    
        return (
            <div id="userHistory">    
                
                <h1 className={classes.heading}>PURCHASE HISTORY</h1>
                
                 {cartArray.length ? cartArray.map(cart => {
                     return (
                         cart.orders.map(order => {
                             return (
                            <Card className={classes.card}>
                                <div key={order.product.id} className = {classes.purchase}>
                                    <img className = {classes.image} src={order.product.thumbnailImgUrl} />                            
                                    <h2 style={{
                                                fontSize: '24px',
                                                fontFamily: 'Luckiest Guy',
                                            }}> {order.product.name} </h2>
                                    <h2> {order.product.price} </h2>
                                    <h2> QUANTITY : {order.quantity} </h2>
                                    <h2> PURCHASED ON : {order.product.updatedAt.slice(0,10)}</h2>
                                </div>
                            </Card>
                             )
                         })
                     )
                 }) : 'no history'}          
            </div>
        )
    }
}

const mapState = (state) => state

const mapDispatch = {
    fetchHistory
}


export default withStyles(styles, { withTheme: true })(
    connect(mapState, mapDispatch)(UserHistory)
)
