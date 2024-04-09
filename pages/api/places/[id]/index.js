import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  switch (request.method) {
    case "GET":
      const place = await Place.findById(id).populate("comments");
      // const comment = place?.comments;
      // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
      // const comments = db_comments.filter((comment) =>
      //   allCommentIds.includes(comment._id.$oid)
      // );
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      response.status(200).json({ place: place });
      break;
    case "PATCH":
      const updatedPlace = await Place.findByIdAndUpdate(id, request.body);
      response.status(200).json({ status: "Place successfully updated!" });
      break;
  }
}
