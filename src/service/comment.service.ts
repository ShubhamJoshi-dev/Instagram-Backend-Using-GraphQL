import postModel from "../database/models/post.schema";
import getBaseQuery from "../database/operations/base";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import { IDecodedPayload } from "../interface/auth.interface";
import { IComment, ICommentWithId } from "../interface/comment.interface";
import commentModel from "../database/models/comment.schema";

async function commentPostService(
  args: { comment: ICommentWithId; postId: string },
  decodedPayload: IDecodedPayload
) {
  const baseInstance = getBaseQuery();
  const payloadInstance = getPayloadInstances();
  const selectInstance = await baseInstance.getSelect();
  const createInstance = await baseInstance.getCreate();
  const updateInstance = await baseInstance.getUpdate();

  const { comment } = args.comment;

  const postId = args.postId;

  const existingPosts = await selectInstance.findOne("_id", postId, postModel);

  const isEmptyPost = typeof existingPosts === "object" && !existingPosts;

  if (isEmptyPost) {
    const errorMessage = `The Post Does not Exists on the System`;
    const errorStatusCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  const commentPayload = Object.preventExtensions({
    comment: comment.trim(),
  });

  const saveCommentData = await createInstance.createPayload(
    commentPayload,
    commentModel
  );

  const commentId = await saveCommentData._doc._id;

  const filterQuery = Object.seal({
    key: "_id",
    value: postId,
  });

  const attachCommentOnPostOnStatus = await updateInstance.updatePayloadByArray(
    filterQuery,
    commentId,
    postModel
  );

  const updateStatus =
    attachCommentOnPostOnStatus.acknowledged &&
    attachCommentOnPostOnStatus.matchedCount > 0;

  if (!updateStatus) {
    const errorMessage = `The Database Opeartion Failed, While Linking the Comment With the Post`;
    const errorStatusCode = StatusCode.INTERNAL_SERVER_ERROR;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  return {
    comments: [
      {
        comment: Array.isArray(comment) ? comment : [comment],
      },
    ],
  };
}

export { commentPostService };
