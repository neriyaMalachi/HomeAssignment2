"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  // Varibles
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [probability, setProbability] = useState();
  const [allUsersToSerched, setAllUsersToSerched] = useState([]);
  const [filterUser, setFilterUser] = useState("");

  // Returns all the names checked in the software
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const users = await axios.get("/api/server/usersAction");
        setAllUsersToSerched(users.data.AllUsers);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    getAllUser();
  }, []);
  // Returns the result according to the entered name
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

  return (
    <div className="bg-slate-200 flex flex-col xl:flex-row justify-evenly items-center  w-full h-[100vh] text-black">
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
            placeholder="name..."
          />
          <p> Nationality : {nationality && <> {nationality}</>}</p>
          <p>Gender : {gender && <> {gender}</>}</p>
          <p> probability : {probability && <> {probability}</>}</p>
        </label>
        <button type="submit" className="bg-yellow-200 w-[50%]  rounded-md">
          Predict
        </button>
      </form>

      <div className=" w-[50%] h-80 p-3  flex flex-col justify-between items-center  rounded-md shadow-2xl">
        <div>
          <input
            type="text"
            className="bg-slate-300 rounded-md"
            placeholder="Serche..."
            onChange={(e: any) => setFilterUser(e.target.value)}
          />
        </div>
        <div className="flex flex-col  h-96 w-full overflow-auto">
          {allUsersToSerched
            .filter((item: any) => {
              return filterUser.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(filterUser);
            })
            .map((user: any) => (
              <div
                key={user._id}
                className="flex justify-around border border-blak p-1 rounded-lg  shadow-lg"
              >
                <p>name : {user.name}</p>,<p>gender : {user.gender}</p>,
                <p>nationality : {user.nationality}</p>,
                <p>probability : {user.probability}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
