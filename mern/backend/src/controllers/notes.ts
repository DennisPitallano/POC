import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
   try {
      const notes = await NoteModel.find().exec();
      res.status(200).json(notes);
   } catch (error) {
      next(error);
   }
};

export const getNote: RequestHandler = async (req, res, next) => {
   try {
      if(mongoose.isValidObjectId(req.params.id) === false) throw createHttpError.BadRequest("Invalid note id");

      const note = await NoteModel.findById(req.params.id).exec();
      if (!note) {
         throw  createHttpError.NotFound("Note not found");
      }
      res.status(200).json(note);
   } catch (error) {
      next(error);
   }
};

interface CreateNoteBody {
   title?: string;
   text?: string;
}

export const createNote: RequestHandler<
   unknown,
   unknown,
   CreateNoteBody,
   unknown
> = async (req, res, next) => {
   const title = req.body.title;
   const text = req.body.text;
   try {
      if (!title) {
         throw new createHttpError.BadRequest("Title is required");
      }

      const newNote = await NoteModel.create({
         title: title,
         text: text,
      });
      res.status(201).json(newNote);
   } catch (error) {
      next(error);
   }
};

interface UpdateNoteParams {
   id: string;
}

interface UpdateNoteBody {
   title?: string;
   text?: string;
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
   const id = req.params.id;
   const title = req.body.title;
   const text = req.body.text;

   try {
      if(mongoose.isValidObjectId(req.params.id) === false )
      {
         throw createHttpError.BadRequest("Invalid note id");
      }

      if(!title) throw createHttpError.BadRequest("Title is required");
      
      const note = await NoteModel.findById(id).exec();
      if(!note) throw createHttpError.NotFound("Note not found");

      note.title = title;
      note.text = text;
      const updatedNote = await note.save();

      res.status(200).json(updatedNote);
   } catch (error) {
      next(error);
   }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
   const id = req.params.id;
   try {
      if(mongoose.isValidObjectId(req.params.id) === false )
      {
         throw createHttpError.BadRequest("Invalid note id");
      }
      const note = await NoteModel.findById(id).exec();

      if(!note) throw createHttpError.NotFound("Note not found");

      await note.deleteOne();
      
      res.status(204);
   } catch (error) {
      next(error);
   }
};
