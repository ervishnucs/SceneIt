import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "MoviesTable";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const params = {
            TableName: TABLE_NAME,
            Item: {
                title: body.title,
                watched: body.watched,
                favoriteScenes: body.favoriteScenes || [],
                updatedAt: body.updatedAt
            }
        };

        await dynamo.send(new PutCommand(params));

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Movie added successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: "Failed to add movie", 
                error: error.message 
            })
        };
    }
};
