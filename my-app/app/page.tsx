"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // בקשה ל-genderize.io
    const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
    const genderData = await genderResponse.json();

    // בקשה ל-nationalize.io
    const nationalityResponse = await fetch(
      `https://api.nationalize.io?name=${name}`
    );
    const nationalityData = await nationalityResponse.json();

    // עדכון המצב עם הנתונים שהתקבלו
    setGender(genderData.gender);
    setNationality(
      nationalityData.country
        .map((country: any) => country.country_id)
        .join(", ")
    );
  };
  return (
    <div className="bg-slate-200 flex flex-col justify-evenly items-center  w-full h-[100vh] text-black">
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
        </label>
        <button type="submit" className="bg-yellow-200 w-[50%]  rounded-md">
          Predict
        </button>
      </form>
    </div>
  );
}
