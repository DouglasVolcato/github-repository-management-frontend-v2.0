import React, { useState } from "react";
import Note from "../Note/Note";
import { repositoryManagementApi } from "../../apis/repositoryManagementApi";
import { useEffect } from "react";
import "./Notes.css";
import {useSelector, useDispatch} from "react-redux"
import { addNotes } from "../../features/notesSlice";
import { RootState } from "../../store/store";

export default function Notes() {

const dispatch = useDispatch()

const notes = useSelector(
    (state: RootState) => state.notes.value
)

  async function getNotes() {
    const data:[] = await repositoryManagementApi.getAllRepo().then((notes) => {
      const priorityHigh = notes
        .filter((i:any) => i.priority === "High")
        .sort((a:any, b:any) => {
          return a.deadline > b.deadline
            ? 1
            : a.deadline === b.deadline
            ? 0
            : -1;
        });
      const priorityMedium = notes
        .filter((i:any) => i.priority === "Medium")
        .sort((a:any, b:any) => {
          return a.deadline > b.deadline
            ? 1
            : a.deadline === b.deadline
            ? 0
            : -1;
        });
      const priorityLow = notes
        .filter((i:any) => i.priority === "Low")
        .sort((a:any, b:any) => {
          return a.deadline > b.deadline
            ? 1
            : a.deadline === b.deadline
            ? 0
            : -1;
        });

      return priorityHigh.concat(priorityMedium).concat(priorityLow);
    });
    // console.log(data)
    dispatch(addNotes([...data]))
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="Notes">
      {notes.map((data:any, index:any) => (
        <Note data={data} key={index} getNotes={getNotes} />
      ))}
    </div>
  );
}
