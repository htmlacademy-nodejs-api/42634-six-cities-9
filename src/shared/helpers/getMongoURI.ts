/**
 * Constructs a MongoDB connection URI.
 *
 * @param username The MongoDB username.
 * @param password The MongoDB password.
 * @param host The MongoDB host.
 * @param port The MongoDB port.
 * @param databaseName The name of the MongoDB database.
 * @returns A string representing the MongoDB connection URI.  Includes `authSource=admin` for authentication.
 */
export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string
) {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
