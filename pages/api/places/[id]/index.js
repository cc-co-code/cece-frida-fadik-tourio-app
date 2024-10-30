//import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.find();
    const currentPlace = place.find((place) => place._id.toString() === id);

    if (!currentPlace) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json({ place: currentPlace });
  }

  if (request.method === "PATCH") {
    const copy = { ...request.body };
    Object.keys(copy).forEach((key) => {
      if (!copy[key]) delete copy[key];
    });

    await Place.findByIdAndUpdate(id, copy);
    response.status(200).json({ status: `Place ${id} updated!` });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
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
