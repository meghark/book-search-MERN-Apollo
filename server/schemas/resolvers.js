// Resolvers are similar to rest api controllers.
// They perform an action on a data source based on a request.
// The datasource is direct access to models imported here.

const { User, Book } = require("../models")

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        }
    }
}

module.exports = resolvers;