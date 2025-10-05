interface IComment {
  comment: string;
}
interface ICommentWithId extends IComment {
  postId: string;
}

export { IComment, ICommentWithId };
