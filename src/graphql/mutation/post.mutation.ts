import { IDecodedPayload } from "../../interface/auth.interface";
import { getAllPostService, postUserService } from "../../service/post.service";

async function postUserMutation(payload: any, decodedPayload: IDecodedPayload) {
  const graphqlResponse = await postUserService(payload, decodedPayload);
  return graphqlResponse;
}

export { postUserMutation, getAllPostService };
