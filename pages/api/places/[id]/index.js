//import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/places";

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
/* const { id } = request.query;

  if (!id) {
    return;
  }

  const place = db_places.find((place) => place._id.$oid === id);
  const comment = place?.comments;
  const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  const comments = db_comments.filter((comment) =>
    allCommentIds.includes(comment._id.$oid)
  );

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json({ place: place, comments: comments });*/
