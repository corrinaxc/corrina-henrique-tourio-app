import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/Comments";
import Place from "../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "POST":
      const comment = await Comment.create(request.body);
      await Place.findByIdAndUpdate(request.body.placeId, {
        $push: { comments: comment._id },
      });
      response.status(200).json({ comment: comment });
      break;
  }
}
