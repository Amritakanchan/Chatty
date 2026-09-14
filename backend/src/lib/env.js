//since we have to import env in every file which is a nuisance, we will make it so that we dont have to do it everytime.

import 'dotenv/config'; // Shortcut for importing + calling the config function.

const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CHATTY_MAIL_API_KEY: process.env.CHATTY_MAIL_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL
}

 export default ENV;

