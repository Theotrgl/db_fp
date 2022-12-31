const uploadImage = ( fileName, imageData) => {
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket('primalbucketpictures');
  const file = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = file.createWriteStream();
    stream.on('finish', () => {
      resolve();
    });
    stream.on('error', (error) => {
      reject(error);
    });
    stream.write(imageData);
    stream.end();
  });
};

export default uploadImage;