import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "MoviesTable";

export const handler = async (event) => {
    try {
        const title = decodeURIComponent(event.pathParameters.title);
        const body = JSON.parse(event.body);

        const params = {
            TableName: TABLE_NAME,
            Key: { title },
            UpdateExpression: "set favoriteScenes = :scenes, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":scenes": body.favoriteScenes,
                ":updatedAt": body.updatedAt
            },
            ReturnValues: "UPDATED_NEW"
        };

        const command = new UpdateCommand(params);
        const result = await dynamo.send(command);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // Add CORS header if calling from frontend
                "Access-Control-Allow-Methods": "PUT",
            },
            body: JSON.stringify({ 
                message: "Movie updated", 
                updatedAttributes: result.Attributes 
            })
        };
    } catch (error) {
        console.error("Update error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",  // Add CORS header if calling from frontend
            },
            body: JSON.stringify({ 
                message: "Failed to update movie", 
                error: error.message 
            })
        };
    }
};
