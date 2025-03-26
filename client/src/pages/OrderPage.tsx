import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { fetchOrders, fetchOrderById } from '../redux/slices/orderSlice';
import '../styles/orderpage.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const OrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId?: string }>();
  const { orders, currentOrder, loading, error } = useAppSelector(
    (state: RootState) => state.orders
  );
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orderId || null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirect: '/orders' } });
      return;
    }
    
    dispatch(fetchOrders());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(fetchOrderById(selectedOrderId));
    }
  }, [dispatch, selectedOrderId]);

  const handleOrderSelect = (id: string) => {
    setSelectedOrderId(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => dispatch(fetchOrders())}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className="order-page">
        <div className="container">
          <h1 className="section-title">My Orders</h1>
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start ordering your favorite wings!</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1 className="section-title">My Orders</h1>
        
        <div className="order-container">
          <div className="orders-list">
            <h2 className="orders-list-title">Order History</h2>
            {orders.map(order => (
              <div 
                key={order.id} 
                className={`order-item ${selectedOrderId === order.id ? 'active' : ''}`}
                onClick={() => handleOrderSelect(order.id)}
              >
                <div className="order-header">
                  <div className="order-id">Order #{order.id.slice(-6)}</div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
                <div className="order-info">
                  <div className="order-date">{formatDate(order.createdAt)}</div>
                  <div className="order-total">${order.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-details card">
            {selectedOrderId && currentOrder ? (
              <>
                <h2 className="order-details-title">
                  Order Details <span>#{selectedOrderId.slice(-6)}</span>
                </h2>
                
                <div className="order-details-section">
                  <h3>Order Status</h3>
                  <div className={`order-status-large ${getStatusClass(currentOrder.status)}`}>
                    {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                  </div>
                  <div className="order-date-large">
                    {formatDate(currentOrder.createdAt)}
                  </div>
                </div>
                
                <div className="order-details-section">
                  <h3>Delivery Address</h3>
                  <p className="delivery-address-display">{currentOrder.address}</p>
                </div>
                
                <div className="order-details-section">
                  <h3>Payment Method</h3>
                  <p className="payment-method-display">
                    {currentOrder.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                  </p>
                </div>
                
                <div className="order-details-section">
                  <h3>Order Items</h3>
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <div className="item-quantity">
                        {item.quantity}x
                      </div>
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                      </div>
                      <div className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-details-section order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>$2.99</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${(currentOrder.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total:</span>
                    <span>${(currentOrder.total + 2.99 + currentOrder.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary btn-reorder"
                  onClick={() => navigate('/menu')}
                >
                  Order Again
                </button>
              </>
            ) : (
              <div className="no-order-selected">
                <p>Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage; 