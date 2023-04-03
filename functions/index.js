// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = db.collection('blood').add({original: original});
  // Send back a message that we've successfully written the message
  cors(req, res, () => {
    // Your response headers here
    res.set('Access-Control-Allow-Origin', '*');
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });
});


exports.receiveMessage = functions.https.onRequest(async (req, res) => {
    const oso = db.collection('blood').doc('3utCeEIKVFWTle8x4avE');
    const doc = await oso.get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    cors(req, res, () => {
        // Your response headers here
        res.set('Access-Control-Allow-Origin', '*');
        res.json({result: `Message with ID: ${writeResult.id} added.`});
      });  
    console.log('Document data:', doc.data());
    }

});