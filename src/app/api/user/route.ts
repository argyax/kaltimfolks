import prisma from "@/utils/connect";
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
    // parse the JSON request body
    const body:RequestBody =await request.json();
  
    // find the user in the database based on the provided email
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password,10)
      }
    });
    const {password, ...result} = user;
    return new Response(JSON.stringify(result));
}