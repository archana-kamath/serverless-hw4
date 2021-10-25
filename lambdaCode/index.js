const { downloadImage, resize, saveToS3 } = require('./utils');

const bucket = '<insert destination bucket name>';

exports.handler = async (event) => {
  const final_url = "<insert destination bucket name URL>" + event.Records[0].s3.object.key
  const buf = await downloadImage(final_url);
  const resized = await resize(buf, 100, 100);
  const key = await saveToS3(bucket, event.Records[0].s3.object.key, resized);
  return { key };
};
