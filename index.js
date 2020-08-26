const sharp = require('sharp');

const imageName = 5;
image = sharp(`${imageName}.png`)
image.resize({ width: 1000 })
  // .blur(10)
  // .rotate(90)
  // .grayscale()
  // .toFormat('jpeg', { quality: 20 })
  .jpeg({
    quality: 60,
    progressive: true,
  })
  .toFile(`${imageName}.jpeg`)
  .catch(err => console.log(err));