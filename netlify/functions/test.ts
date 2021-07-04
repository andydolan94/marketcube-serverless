import { Handler } from "@netlify/functions";
import { request, gql } from "graphql-request";

const handler: Handler = async (event, context) => {
	const query = gql`
		{
			launchesPast(limit: 10) {
				mission_name
				launch_date_local
				launch_site {
					site_name_long
				}
			}
		}
	`;

	let requestData = "Hello World";

	await request("https://api.spacex.land/graphql/", query).then((data: any) => {
		requestData = data;
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ message: requestData }),
	};
};

export { handler };
