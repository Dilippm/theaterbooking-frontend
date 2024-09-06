// PaymentPage.js
import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useParams,useLocation } from 'react-router-dom';
import {bookSeat} from '../../api/BookingApi'
// Make sure to replace with your own publishable key
const stripePromise = loadStripe('pk_test_51NJuUZSAAYZdIKiYzNoSZTMgnqW15rvvfTQw8inRG3WB7l1AnHNYZYrU2V4Ehs2nzDqlHa9D2tH4sWw5yUUItutL00AonyHUV4');

const CheckoutForm = () => {
    const { price } = useParams(); // Get amount from URL params
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { credentials } = location.state || {};
    console.log("cre:",credentials)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        // Call your backend to create a PaymentIntent
        try {
            const { data: { clientSecret } } = await axios.post('http://localhost:8023/api/bookings/create-payment-intent', {
                amount: price, // Use the amount from URL params
            });

            // Use the client secret to confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'Customer Name', // Replace with actual customer name
                        address: {
                            line1: '123 Main St', // Replace with actual address line 1
                            city: 'Mumbai', // Replace with actual city
                            state: 'MH', // Replace with actual state
                            postal_code: '400001', // Replace with actual postal code
                            country: 'IN', // Country code for India
                        },
                    },
                },
            });

            if (error) {
                console.log('[error]', error);
                alert('Payment failed: ' + error.message);
            } else if (paymentIntent.status === 'succeeded') {
               const data = await bookSeat(credentials,clientSecret)
               console.log("data:",data)
            //    // Include clientSecret in credentials and call backend to store booking details
            //    await axios.post('http://localhost:8023/api/bookings/add_booking', {
            //     ...credentials,
            //     paymentId:clientSecret, // Add clientSecret to credentials
            // });
            alert('Payment successful!');

            }
        } catch (err) {
            console.error('Payment error:', err);
            alert('Payment failed: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.amountContainer}>
                <label style={styles.label}>
                    Amount (in cents):
                    <span style={styles.amount}>{price}</span> {/* Display the amount */}
                </label>
            </div>
            <CardElement options={cardStyle} />
            <button type="submit" disabled={!stripe} style={styles.button}>
                Pay
            </button>
        </form>
    );
};

// CardElement style options
const cardStyle = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Arial, sans-serif',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

// Inline styles for the page
const styles = {
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    amountContainer: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    amount: {
        display: 'inline-block',
        marginLeft: '10px',
        fontSize: '18px',
        color: '#333',
    },
    button: {
        backgroundColor: '#5469d4',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '4px',
        width: '100%',
        marginTop: '20px',
    },
};

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <h1 style={{ textAlign: 'center' }}>Stripe Payment Page</h1>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentPage;
