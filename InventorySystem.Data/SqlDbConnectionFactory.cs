using System.Data;
using Microsoft.Data.SqlClient;

namespace InventorySystem.Data
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }

    public class SqlDbConnectionFactory : IDbConnectionFactory
    {
        private readonly string _connectionString;

        public SqlDbConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
