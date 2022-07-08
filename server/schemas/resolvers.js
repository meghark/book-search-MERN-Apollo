// Resolvers are similar to rest api controllers.
// They perform an action on a data source based on a request.
// The datasource is direct access to models imported here.

const { User, Book } = require("../models")

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
    }
}

module.exports = resolvers;