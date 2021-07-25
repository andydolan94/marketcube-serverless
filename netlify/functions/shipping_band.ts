import { Handler } from "@netlify/functions";
import { gql, GraphQLClient } from "graphql-request";

const handler: Handler = async (event, context) => {
	const endpoint = "https://gql.marketcube.io/graphql";

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			"Content-Type": "application/json",
			token: process.env.MARKETCUBE_GRAPHQL_TOKEN!,
		},
	});

	const query = gql`
		{
			getShippingBand {
				status
				error
				data {
					... on GetShippingBandData {
						shippingRows {
							_id
							createdBy
							description
							isUpdateAllowed
							name
							parentId
							price
							priceType
							updatedBy
							userId
						}
						shippingTerm
					}
				}
			}
		}
	`;

	const requestData = await graphQLClient.request(query);

	// let requestData = "No data found";

	// await request("https://gql.marketcube.io/graphql", query)
	// 	.then((data: any) => {
	// 		requestData = data;
	// 	})
	// 	.catch((err) => (requestData = err));

	return {
		statusCode: 200,
		body: requestData,
	};
};

export { handler };
