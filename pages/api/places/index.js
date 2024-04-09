import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const places = await Place.find();
      return response.status(200).json(places);
    case "POST":
      try {
        const place = await Place.create(request.body);
        response.status(200).json({place:place})
      } catch (error) {
        response.status(400).json({error:error.message})
      }
  }
};
