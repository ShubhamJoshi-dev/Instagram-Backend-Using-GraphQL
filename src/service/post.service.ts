import userModel from "../database/models/user.schema";
import getBaseQuery from "../database/operations/base";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import { IDecodedPayload } from "../interface/auth.interface";
import { IPost } from "../interface/post.interface";
import postModel from "../database/models/post.schema";
import tagsModel from "../database/models/tags.schema";
import { includeKeyIntoObjects } from "../utils/common.utils";

async function postUserService(
  payload: { post: IPost },
  decodedPayload: IDecodedPayload
) {
  const { userId } = decodedPayload;

  const { title, description, tags } = payload.post;

  const baseInstance = getBaseQuery();

  const payloadInstance = getPayloadInstances();

  const createInstance = await baseInstance.getCreate();
  const updateInstance = await baseInstance.getUpdate();

  const selectQuery = await baseInstance.getSelect();

  const userData = await selectQuery.findOne("_id", userId, userModel);

  const isEmptyData = typeof userData === "object";

  if (!isEmptyData) {
    const errorMessage = `The User Does not Exists on the System`;
    const errorStatusCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  const postPayload = Object.preventExtensions({
    title: title,
    description: description,
    postedBy: userId,
  });

  const savePostPayloadResult = await createInstance.createPayload(
    postPayload,
    postModel
  );

  const postId = savePostPayloadResult._doc._id;

  const filteredTags = tags.map((item: string) => item.trim()).filter(Boolean);

  const tagsPayload = Object.preventExtensions({
    tags: filteredTags,
    postId: postId,
    tagsCreatedBy: userId,
  });

  const saveTagsPayload = await createInstance.createPayload(
    tagsPayload,
    tagsModel
  );

  const tagsId = saveTagsPayload._doc._id;

  const filterQuery = {
    [`_id`]: postId,
  } as any;

  const updatePayload = Object.preventExtensions({
    tags: tagsId,
  });

  const updateResult = await updateInstance.updatePayload(
    filterQuery,
    updatePayload,
    postModel
  );

  const isUpdatedStatus =
    updateResult.acknowledged && updateResult.matchedCount > 0;

  if (!isUpdatedStatus) {
    const errorMessage = `The Database Update Operation Failed`;
    const errorCode = StatusCode.INTERNAL_SERVER_ERROR;
    return payloadInstance.createErrorPayload(errorMessage, errorCode);
  }

  const apiResponse = {
    ...includeKeyIntoObjects(
      savePostPayloadResult._doc,
      "title",
      "description"
    ),
    tags: filteredTags,
  };

  return {
    post: apiResponse,
  };
}

async function getAllPostService(): Promise<Array<IPost>> {
  const baseInstance = getBaseQuery();
  const selectInstance = await baseInstance.getSelect();
  const toPopulateQuery = [
    {
      path: "tags",
    },
    {
      path: "postedBy",
    },
  ];
  const allPost = await selectInstance.findAllPopulate(
    postModel,
    toPopulateQuery
  );
  const mappedPostData = allPost.map((data: Record<string, any>) => {
    const payload = {
      title: data.title,
      description: data.description,
      comments: data.comments,
      createdAt: data.createdAt,
      tags: data.tags.tags,
      postedBy: data.postedBy.name,
    };
    return payload;
  });
  return mappedPostData;
}

async function getPostService(
  postId: string
): Promise<{ post: IPost } | { error: { message: string; code: number } }> {
  const baseInstance = getBaseQuery();
  const payloadInstance = getPayloadInstances();

  const selectQuery = await baseInstance.getSelect();
  const toPopulateQuery = [
    {
      path: "tags",
    },
    {
      path: "postedBy",
    },
  ];
  const postData = await selectQuery.findOnePopulate(
    "_id",
    postId,
    postModel,
    toPopulateQuery
  );

  const postPayload = includeKeyIntoObjects(
    postData._doc,
    "title",
    "description"
  );
  const tagsPayload = includeKeyIntoObjects(postData._doc.tags._doc, "tags");
  const userPayload = includeKeyIntoObjects(
    postData._doc.postedBy._doc,
    "name"
  );
  const mainPayload = {
    ...postPayload,
    ...tagsPayload,
    ...userPayload,
  };

  if (!postData) {
    const errorMessage = `The Post Does not Exists or The Post is Deleted`;
    const errorStatusCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  return {
    post: mainPayload,
  };
}

export { postUserService, getAllPostService, getPostService };
