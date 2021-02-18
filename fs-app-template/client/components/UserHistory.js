import React from 'react'
import { connect } from 'react-redux'
import { fetchHistory } from '../store/history'
// import { removeProduct } from '../store/cart'





class UserHistory extends React.Component {
    async componentDidMount() {
        const history = await this.props.fetchHistory(this.props.auth.id);
        console.log(this.props);
        // console.log(history);
        
        //console.log('userHistory array of products', orderArray);
    }
    
    render() {
        const orderArray = this.props.userHistory.length ? this.props.userHistory[0].orders : [];        
        return (
            <div>             
                 {orderArray.length ? orderArray.map(order => {
                     return (
                         <div key={order.product.id}>
                             <img src={order.product.thumbnailImgUrl} />                            
                             <h2>{order.product.name}</h2>
                             <h4>{order.product.price}</h4>
                         </div>
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

export default connect(mapState, mapDispatch)(UserHistory)
