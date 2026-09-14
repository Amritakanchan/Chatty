import { Resend } from 'resend';
import ENV from './env.js';

const resendClient = new Resend(ENV.CHATTY_MAIL_API_KEY);

const sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME
}

export { resendClient, sender }; 

// EXPORT BOTH RESEND AND SENDER OBJECTS