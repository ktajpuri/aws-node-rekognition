const sharp = require('sharp');

image = sharp('input.jpg')
image
resize(200, 200)
.blur(10)
.rotate(90)
.grayscale()
.toFormat('jpeg', { quality: 100 })
.toFile('output.jpg')
.catch(err => console.log(err));