// Resolvers are similar to rest api controllers.
// They perform an action on a data source based on a request.
// The datasource is direct access to models imported here.

const { User } = require("../models")
const { AuthenticationError} = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged in user
        me: async (parent, args, context) => {
          if (context.user) {
              const userData = await User.findOne({ _id: context.user._id });
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
     
        // Add a new user.
        addUser: async(parent , args) => {
            const user = await User.create(args);
           
            //Sign a token and return an object with token and user's data.
            const token = signToken(user);
            return { token, user};
        },
       
        login: async(parent, {email, password}) => {
     
           // Login resolver. First check to see if user exists.
          // Second check for valid password.
          // Authentication errors thrown will be caught by graphQl and send to client.
            const user = await User.findOne({ email });

            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const validPw = await user.isCorrectPassword(password);

            if(!validPw)
            {
                throw new AuthenticationError('Incorrect credentails')
            };

            const token =  signToken(user);

            return { token, user} ;
        },

        saveBook: async(parent, {input} , context) => {
       
           if (context.user) {
             const updateUser = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $addToSet: { savedBooks: input } },
               { new: true, runValidators: true }
             );
  
             return updateUser;
           }
         
           throw new AuthenticationError('You need to be logged in!');
         },

          removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
              const updateUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId}
                 } },
                { new: true, runValidators: true }
              );
          
              return updateUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
    }
}

module.exports = resolvers;