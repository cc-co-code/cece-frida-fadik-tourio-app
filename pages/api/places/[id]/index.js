//import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const currentPlace = await Place.findById(id).populate("comments");

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

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      const comment = await Comment.create(commentData);

      await Place.findByIdAndUpdate(id, {
        $push: { comments: comment._id },
      });
      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
