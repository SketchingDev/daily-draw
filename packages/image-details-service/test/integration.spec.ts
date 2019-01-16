import AWS from "aws-sdk";
import axios from "axios";
import { IBasicImageDetails } from "messages-lib/lib/messages/imageDetails";
import uuidv4 from "uuid/v4";
import waitForExpect from "wait-for-expect";
import { IImageSource } from "messages-lib";

jest.setTimeout(20 * 1000);

const assertInputEnvVariablesSet = () => {
  expect(process.env.TF_OUTPUT_aws_region).toBeDefined();
  expect(process.env.TF_OUTPUT_private_url).toBeDefined();
  expect(process.env.TF_OUTPUT_subscribed_topic_arn).toBeDefined();
};

describe("Public Image Details integration test", () => {
  let sns: AWS.SNS;

  beforeAll(() => {
    assertInputEnvVariablesSet();

    AWS.config.update({ region: process.env.TF_OUTPUT_aws_region });
    sns = new AWS.SNS({ apiVersion: "2010-03-31" });
  });

  it("Image details saved and presented by API", async () => {
    const imageId = uuidv4();
    const description = uuidv4();

    const message: IBasicImageDetails = { imageId, description };

    const params = {
      Message: JSON.stringify(message),
      TopicArn: process.env.TF_OUTPUT_subscribed_topic_arn,
    };

    await sns.publish(params).promise();

    let result;
    await waitForExpect(async () => {
      result = await axios.get(`${process.env.TF_OUTPUT_private_url}/${imageId}`);
      expect(result).toMatchObject({
        status: 200,
        data: {
          Count: 1,
          Items: [
            {
              ImageId: {
                S: imageId,
              },
              Description: {
                S: description,
              },
            },
          ],
          ScannedCount: 1,
        },
      });
    });
  });

  it("Image source saved and presented by API", async () => {
    const imageId = uuidv4();
    const description = uuidv4();
    const publicUrl = uuidv4();

    const message: IImageSource = { imageId, publicUrl };

    const params = {
      Message: JSON.stringify(message),
      TopicArn: process.env.TF_OUTPUT_subscribed_topic_arn,
    };

    await sns.publish(params).promise();

    let result;
    await waitForExpect(async () => {
      result = await axios.get(`${process.env.TF_OUTPUT_private_url}/${imageId}`);
      expect(result).toMatchObject({
        status: 200,
        data: {
          Count: 1,
          Items: [
            {
              ImageId: {
                S: imageId,
              },
              Description: {
                S: description,
              },
              PublicUrl: {
                S: publicUrl,
              },
            },
          ],
          ScannedCount: 1,
        },
      });
    });
  });
});
