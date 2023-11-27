require('dotenv').config();
const twilio = require('twilio');

const { ACCOUNT_SID, AUTH_TOKEN, SERVICE_SID } = process.env;

// Inicializa el cliente Twilio con tus credenciales
const client =require ("twilio")(ACCOUNT_SID, AUTH_TOKEN);

// Define una función para enviar OTP
async function sendOTP(phoneNumber) {
  try {
    // Crea una verificación en Twilio y envía un SMS con el código OTP
    const verification = await client.verify.v2.services(SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    
    const envio = console.log(`Se envio un sms con el codigo al ${verification.to}`);

    return envio;
  } catch (error) {
    console.error('Error al enviar OTP:', error);
    throw error;
  }
}

module.exports = sendOTP;
