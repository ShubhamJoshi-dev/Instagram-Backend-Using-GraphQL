import { IDecodedPayload } from "../../interface/auth.interface";
import { commentPostService } from "../../service/comment.service";

async function commentPostMutation(
  payload: any,
  decodedPayload: IDecodedPayload
) {
  const graphqlResponse = await commentPostService(payload, decodedPayload);
  return graphqlResponse;
}

export { commentPostMutation };
