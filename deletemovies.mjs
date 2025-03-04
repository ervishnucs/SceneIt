import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "MoviesTable";

export const handler = async (event) => {
    try {
        const title = decodeURIComponent(event.pathParameters.title);

        const params = {
            TableName: TABLE_NAME,
            Key: { title }
        };

        await dynamo.send(new DeleteCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Movie '${title}' deleted successfully!` })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to delete movie", error: error.message })
        };
    }
};
