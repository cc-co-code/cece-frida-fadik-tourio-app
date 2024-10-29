import dbConnect from "../../../db/connect";
import Place from "../../../db/models/places";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const place = await Place.find();

    console.log(place);

    return response.status(200).json(place);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
