import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/mongodb";
import UserModel from "../../models/modelUser";

export async function POST(request: NextRequest) {
  const UserName = await request.json();

  const genderResponse = await fetch(
    `https://api.genderize.io?name=${UserName.name}`
  );
  const genderData = await genderResponse.json();
  console.log("gender: ",genderData);
  
  const nationalityResponse = await fetch(
    `https://api.nationalize.io?name=${UserName.name}`
  );
  const nationalityData = await nationalityResponse.json();
  console.log("nation",nationalityData);

  const country = nationalityData.country
    .map((c: any) => c.country_id)
    .join(",");

  try {
    dbConnect();

    const user = new UserModel({
      name: UserName.name,
      gender: genderData.gender,
      nationality: country,
      probability: genderData.probability,
    });
    const SavedUser = await user.save();
    return NextResponse.json({
      message: "User Added Successfully !!! ",
      success: true,
      SavedUser,
    });
  } catch (error: any) {
    console.log("Error In User Action Route");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    dbConnect()
    const AllUsers= await UserModel.find()
    return NextResponse.json({
      massage:"successfull",
      status:200,
      AllUsers
    })
  } catch (error: any) {
    return NextResponse.json({ errror: error.message }, { status: 500 });
  }
}
