const AWS = require('aws-sdk');
const sharp = require('sharp');

AWS.config.update({
    region: 'us-east-2'
});
const rekognition = new AWS.Rekognition();

const detectFace = (imageBuffer) => {
    const params = {
        Image: {
            Bytes: imageBuffer
        },
        Attributes: [
            'ALL',
        ]
    };
    rekognition.detectFaces(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(JSON.stringify(data, null, 4));           // successful response
    });
};


const recognizeCelebrities = (imageBuffer) => {
    const params = {
        Image: {
            Bytes: imageBuffer
        }
    };
    rekognition.recognizeCelebrities(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(JSON.stringify(data, null, 4));           // successful response
    });
};

const detectObjects = (imageBuffer) => {
    const params = {
        Image: {
            Bytes: imageBuffer
        },
        MaxLabels: 123, 
        MinConfidence: 70
    };
    rekognition.detectLabels(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(JSON.stringify(data, null, 4));           // successful response
    });
};

sharp('imageWithFace.jpg')
    .toBuffer()
    .then(recognizeCelebrities);