import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "MoviesTable";  // Make sure this table exists in DynamoDB

export const handler = async () => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const command = new ScanCommand(params);
        const data = await dynamo.send(command);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Temporary for testing CORS
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error("Error fetching movies:", error);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Failed to fetch movies",
                error: error.message,
            }),
        };
    }
};
