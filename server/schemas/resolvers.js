// Resolvers are similar to rest api controllers.
// They perform an action on a data source based on a request.
// The datasource is direct access to models imported here.

const { User, Book } = require("../models")
const { AuthenticationError} = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return User.find();
        },
        // Get a single user
        user: async (parent, {_id}) => {
            return User.findOne({ _id })
        }
    },

    Mutation: {

        // Add a new user.
        createUser: async(parent , args) => {
            const user = await User.create(args);
           
            //Sign a token and return an object with token and user's data.
            const token = signToken(user);
            return { token, user};
        },
        // Login resolver. First check to see if user exists.
        // Second check for valid password.
        // Authentication errors thrown will be caught by graphQl and send to client.
        login: async(parent, {email, password}) => {
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
        saveBook: async (parent, { userId, bookBody }, context) => {
            if (context.user) {
              const updateUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: { bookBody//, username: context.user.username 
                } } },
                { new: true, runValidators: true }
              );
          
              return updateUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
              const updateUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId}//, username: context.user.username 
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