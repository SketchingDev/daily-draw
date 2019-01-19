import middy from "middy";
import { logEvent } from "middy-middleware-lib";
import { validator } from "middy/middlewares";
import { saveImageSourceHandler } from "./saveImageSource/saveImageSourceHandler";
import { extractFirstSnsRecord } from "./sns/extractFirstSnsRecord";
import { extractParsedJsonSnsMessage } from "./sns/extractParsedJsonSnsMessage";
import { snsSchema } from "./sns/snsSchema";

export const handler = middy(saveImageSourceHandler)
  .use(logEvent())
  .use(validator({ inputSchema: snsSchema }))
  .use(extractFirstSnsRecord())
  .use(extractParsedJsonSnsMessage());

module.exports = { handler };