import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database';
import User from '@models/user';

// console.log(
//     {clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// }
// )
const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session ({session}){
        const sessionUSer = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUSer._id.toString();
        return session;
    },
    async signIn({profile}) {
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
                    image: profile.picture
                })
            }
            return true;
        } catch(error){
            console.log(error);
            return flase;
        }
    }
})

export {handler as GET, handler as POST};