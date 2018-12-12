const AWS = require("aws-sdk");
const sharp = require("sharp");

AWS.config.update({
  region: "us-east-2"
});
const rekognition = new AWS.Rekognition();
class AWSRekognition extends sharp {
  constructor(input) {
    super(input);
    this.toBuffer = () => {
      return super.toBuffer().then(data => {
        this.buffer = data;
        return new Promise(function(resolve, reject) {
          resolve();
        });
      });
    };

    this.detectFace = () => {
      const params = {
        Image: {
          Bytes: this.buffer
        },
        Attributes: ["ALL"]
      };
      rekognition.detectFaces(params, this.print);
    };

    this.recognizeCelebrities = () => {
      const params = {
        Image: {
          Bytes: this.buffer
        }
      };
      rekognition.recognizeCelebrities(params, this.print);
    };

    this.detectObjects = () => {
      const params = {
        Image: {
          Bytes: this.buffer
        },
        MaxLabels: 123,
        MinConfidence: 70
      };
      rekognition.detectLabels(params, this.print);
    };

    this.detecttext = () => {
      const params = {
        Image: {
          Bytes: this.buffer
        }
      };
      rekognition.detectText(params, this.print);
    };

    this.print = (err, data) => {
        if (err) console.log(err, err.stack);
        // an error occurred
        if(data) console.log(JSON.stringify(data, null, 4)); // successful response
        return this;
    }

    this.run = () => {
        this.toBuffer()
        //.then(this.recognizeCelebrities)
        .then(this.detectFace)
        .then(this.detecttext)
        //.then(this.detectObjects)
        .then(this.print)
    };
  }
}

new AWSRekognition("text.png").run();
