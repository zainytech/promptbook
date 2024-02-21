import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const POST = async (req,res) =>{
    const {userId,prompt,tag} = await req.json();

    try{
        await connectToDB();
        //connect the db everytime cuz its a lambda funtions means its gonna die once it done its job so every time that it gets called it needs to connect to the db, do its job and then go in peace.

        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201})

    }catch(error){
        return new Response("Failed to create a new prompt",{status:500})
    }
}