import { IDecodedPayload } from "../interface/auth.interface";
import { IComment } from "../interface/comment.interface";

async function commentPostService(
  comment: IComment,
  decodedPayload: IDecodedPayload
) {
  console.log(comment);
}

export { commentPostService };
