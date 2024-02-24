import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from '@models/user';
import {connectToDB} from '@utils/database';
// console.log("user",User)
// console.log(
//     {clientId: process.env.GITHUB_ID,
//     clientSecret: process.env.GITHUB_SECRET,
// }
// )
// connectToDB();
const authOptions = {
    providers : [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks:{
        
        async session ({session}){
            
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            // maxAge= 30 * 24 * 60 * 60,
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({account,profile,user,credentials}) {
            try{
                await connectToDB();
                //check if user exists
                const userExists = await User.findOne({
                    email:profile.email
                });
                
                //if no, create new user
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.avatar_url,
                    })
                }
                return true;
            } catch(error){
                console.log("checking if user exist",error);
                return flase;
            }
        }
    }
    
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };