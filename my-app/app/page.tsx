"use client"
import Image from "next/image";
import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // בקשה ל-genderize.io
    const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
    const genderData = await genderResponse.json();

    // בקשה ל-nationalize.io
    const nationalityResponse = await fetch(`https://api.nationalize.io?name=${name}`);
    const nationalityData = await nationalityResponse.json();

    // עדכון המצב עם הנתונים שהתקבלו
    setGender(genderData.gender);
    setNationality(nationalityData.country.map((country:any) => country.country_id).join(', '));
  };
  return (

    
        <div className="bg-slate-500 flex flex-col justify-evenly items-center  w-full h-[100vh] text-black">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
              Enter a name:
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black"
              />
            </label>
            <button type="submit" className="bg-yellow-100 rounded-md">Predict</button>
          </form>
          {gender && <p>Gender: {gender}</p>}
          {nationality && <p>Nationality: {nationality}</p>}
        </div>
    
    
  );
}
