const router = require("express").Router();
const { Roles } = require("../utils");
const {
  createPosts,
  fetchPosts,
  editPost,
  deletePosts,
} = require("../business_logic/posts");
const { validateBodySchema, authorize } = require("../middlewares");
const { postSchema } = require("../schema");

router.post(
  "/",
  authorize([Roles.Admin]),
  validateBodySchema(postSchema),
  createPosts
);

router.get("/", authorize([Roles.Admin, Roles.Student]), fetchPosts);

router.put(
  "/:postId",
  authorize([Roles.Admin]),
  validateBodySchema(postSchema),
  editPost
);

router.delete("/:postId", authorize([Roles.Admin]), deletePosts);

module.exports = router;
