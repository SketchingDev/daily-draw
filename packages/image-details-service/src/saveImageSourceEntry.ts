import middy from "middy";
import { log } from "middy-middleware-lib";
import { validator } from "middy/middlewares";
import { imageSourceUpdateObjectGenerator } from "./saveImageSource/updateObjectGenerator";
import { saveImageState } from "./saveImageState";
import { extractFirstSnsRecord } from "./sns/extractFirstSnsRecord";
import { extractParsedJsonSnsMessage } from "./sns/extractParsedJsonSnsMessage";
import { snsSchema } from "./sns/snsSchema";

export const handler = middy(saveImageState(imageSourceUpdateObjectGenerator))
  .use(log())
  .use(validator({ inputSchema: snsSchema }))
  .use(extractFirstSnsRecord())
  .use(extractParsedJsonSnsMessage());

module.exports = { handler };
