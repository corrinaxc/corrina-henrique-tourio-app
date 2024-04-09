import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect()
  const { id } = request.query;


  if (!id) {
    return;
  }

  switch (request.method) {
    case "GET":
      const place = await Place.findById(id).populate("comments");
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      response.status(200).json({ place: place});
      case "DELETE":
        try {await Place.findByIdAndDelete(id);
        response.status(200).json({status: 'This place has been deleted'});
        } catch (error) {
          return response.status(500).json({status: 'unable to delete place'})
        }
      break
  }
}
