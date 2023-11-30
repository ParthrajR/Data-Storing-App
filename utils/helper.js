const uuid = require('uuid');
const qr = require('qrcode');
const shortid = require('shortid'); // Import a shortening library

function generateShortLink() {
  return shortid.generate(); // You can use any shortening library of your choice
}


function generateRandomGroupID() {
    const uniqueId = uuid.v4();
    return uniqueId;
}

function generateGroupLink(){
const baseUrl = 'https://example.com/';
const groupId = generateRandomGroupID();
const generatedLink = baseUrl + groupId;
return generatedLink
}
// const uploadMiddleware = upload.single('profilePhoto');

async function generateQrCode() {
    try {
      const qrText = generateGroupLink();
      const qrOptions = {
        errorCorrectionLevel: 'H',
        type: 'png',
        margin: 4,
        scale: 4,
      };
  
      // Assuming `generateGroupLink()` and `short` are correctly defined
      const qrCodeDataURL = await qr.toDataURL(qrText, qrOptions);
      
      // Assuming `short` is used for generating a short link
      const qrShortLink = generateShortLink();

  
      console.log('QR code generated successfully!');
      console.log('QR code data URL:', qrCodeDataURL);
      console.log('Short Link:', qrShortLink);
  
      return qrCodeDataURL; // Return both the data URL and the short link
    } catch (err) {
      console.error('Error generating QR code:', err);
      return { qrCodeDataURL: null, qrShortLink: null }; // Handle the error or return default values
    }
  }


module.exports = {generateRandomGroupID, generateGroupLink, generateQrCode}

// Example usage:
// console.log('Generated UUID:', generatedUUID);