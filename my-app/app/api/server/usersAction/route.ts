import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/mongodb";
import UserModel from "../../models/modelUser";

// All action of names

// Add a name and the probability that he got into to mongodb
export async function POST(request: NextRequest) {
  const UserName = await request.json();

  //Get a gender acording name
  const genderResponse = await fetch(
    `https://api.genderize.io?name=${UserName.name}`
  );
  const genderData = await genderResponse.json();

  //Get a nationality acording name
  const nationalityResponse = await fetch(
    `https://api.nationalize.io?name=${UserName.name}`
  );
  const nationalityData = await nationalityResponse.json();

  //Run to country data
  const country = nationalityData.country
    .map((c: any) => c.country_id)
    .join(",");

  try {
    dbConnect();
    // Add new user
    const user = new UserModel({
      name: UserName.name,
      gender: genderData.gender,
      nationality: country,
      probability: genderData.probability,
    });

    const SavedUser = await user.save();
    //Return the status
    return NextResponse.json({
      message: "User Added Successfully !!! ",
      success: true,
      SavedUser,
    });
  } catch (error: any) {
    //If a get arror the response do this 
    console.log("Error In User Action Route");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//Get a all name and the category acording name
export async function GET() {
  try {
    // Connect to mongodb
    dbConnect();

    //Get all users and returned 
    const AllUsers = await UserModel.find();
    return NextResponse.json({
      massage: "successfull",
      status: 200,
      AllUsers,
    });
  } catch (error: any) {
    // If geting error this is a response
    return NextResponse.json({ errror: error.message }, { status: 500 });
  }
}
