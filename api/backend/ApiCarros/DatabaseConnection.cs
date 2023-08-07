using MySql.Data.MySqlClient;

namespace ApiCarros
{
    public class DatabaseConnection
    {
        private static string BuildConnection()
        {
            MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder();
            builder.Server = "localhost";
            builder.Database = "test";
            builder.UserID = "root";
            builder.Password = "";

            return builder.ConnectionString;
        }

        public static MySqlConnection GetConnection()
        {
            MySqlConnection connection = new MySqlConnection(BuildConnection());
            return connection;
        }
    }
}
