"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [probability, setProbability] = useState();
  const [allUsersToSerched, setAllUsersToSerched] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const ResPromis = await axios.post("/api/server/usersAction", {
        name: name,
      });
      setGender(ResPromis.data.SavedUser.gender);
      setNationality(ResPromis.data.SavedUser.nationality);
      setProbability(ResPromis.data.SavedUser.probability);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getAllUser = async () => {
    try {
      const users = await axios.get("/api/server/usersAction");
      setAllUsersToSerched(users.data.AllUsers);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  console.log(allUsersToSerched);
  
  return (
    <div className="bg-slate-200 flex flex-col md:flex-row justify-evenly items-center  w-full h-[100vh] text-black">
      <form
        onSubmit={handleSubmit}
        className=" w-96 h-96  flex flex-col justify-evenly items-center bg-gray-50 rounded-md shadow-2xl"
      >
        <label className=" flex flex-col justify-around ">
          Enter a name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black border border-black rounded-md"
          />
          <p>Gender : {gender && <> {gender}</>}</p>
          <p> Nationality : {nationality && <> {nationality}</>}</p>
          <p> probability : {probability && <> {probability}</>}</p>
        </label>
        <button type="submit" className="bg-yellow-200 w-[50%]  rounded-md">
          Predict
        </button>
      </form>
      
      <div className=" w-96 h-96  flex flex-col justify-evenly items-center bg-gray-50 rounded-md shadow-2xl">
        {allUsersToSerched.map((user,index) => 
          <p key={index}>{user}</p>
        )}
      </div>
    </div>
  );
}
