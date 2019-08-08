const graphql = require('graphql');
const { GraphQLEnumType, GraphQLString, GraphQLObjectType, GraphQLBoolean,GraphQLList } = graphql;
const gender = new GraphQLEnumType({
	name: 'gender',
	values: { male: { value: 'male' }, female: { value: 'female' } }
});
const userType = new GraphQLObjectType({
	name: 'user',
	fields: () => ({
		imageUrl: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		gender: { type: gender },
		phone: { type: GraphQLString },
		services: { type: new GraphQLList(serviceType) }
	})
});
const serviceType = new GraphQLObjectType({
	name: 'service',
	fields: () => ({
		timeCreated: { type: GraphQLString },
		category: { type: GraphQLString },
		published: { type: GraphQLBoolean },
		userName: { type: GraphQLString },
		email: { type: GraphQLString },
		role: { type: GraphQLString },
		serviceTitle: { type: GraphQLString },
		description: { type: GraphQLString }
	})
});
