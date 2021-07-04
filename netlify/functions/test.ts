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

	request("https://api.spacex.land/graphql/", query).then((data: any) => {
		console.log(data)
		return {
			statusCode: 200,
			body: JSON.stringify(data)
		}
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Hello World" }),
	};
};

export { handler };
