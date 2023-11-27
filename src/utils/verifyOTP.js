const { ACCOUNT_SID, AUTH_TOKEN, SERVICE_SID } = process.env;
const twilio = require('twilio');

// Inicializa el cliente Twilio con tus credenciales
const client = twilio(ACCOUNT_SID, AUTH_TOKEN,SERVICE_SID);

// Define una función para verificar el OTP
async function verifyOTP(phone, code) {

  try {
    // Realiza una verificación en Twilio utilizando el código OTP ingresado por el usuario
    const verification_check = await client.verify.v2.services(SERVICE_SID)
      .verificationChecks
      .create({ to: phone, code });
      
    console.log(verification_check.status);
    console.log(phone)

    return verification_check;
  } catch (error) {
    console.error('Error al verificar el OTP:', error);
    throw error;
  }
}

module.exports = verifyOTP ;
