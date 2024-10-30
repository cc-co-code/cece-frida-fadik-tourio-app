import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Place.find();

    console.log(place);

    return response.status(200).json(place);
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      console.log(placeData);
      await Place.create(placeData);
      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
