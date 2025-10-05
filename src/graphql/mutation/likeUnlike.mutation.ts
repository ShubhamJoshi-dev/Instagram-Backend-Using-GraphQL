import { IDecodedPayload } from "../../interface/auth.interface";
import { likeService, unlikeService } from "../../service/likeUnlike.service";

async function likeMutation(payload: any, decodedPayload: IDecodedPayload) {
  const graphqlResponse = await likeService(payload, decodedPayload);
  return graphqlResponse;
}

async function unlikeMutation(payload: any, decodedPayload: IDecodedPayload) {}

export { likeMutation, unlikeMutation };
