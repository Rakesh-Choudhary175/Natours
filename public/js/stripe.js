import axios from "axios";
import { showAlert } from "./alert";
const stripe = Stripe('pk_test_51M2cwKSHTVngPQfb5Y0y0110niOhqM7ABR009q1BU6Weuww7a8xa8GaMcK2qdBXiaWOkWsx4cThRsk3ByI41nez1009gr7KsH6');

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`);
        console.log(session);

        // 2) Craete checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });

    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }


}