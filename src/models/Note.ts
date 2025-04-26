import { Note } from "@/types/note";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface NoteDocument extends Omit<Note, "_id">, Document<Types.ObjectId> {

}

const NoteSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    color: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const NoteModel: Model<NoteDocument> = mongoose.models.Note || mongoose.model<NoteDocument>("Note", NoteSchema);

export default NoteModel;
