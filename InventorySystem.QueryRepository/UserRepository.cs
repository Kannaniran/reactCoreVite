using Dapper;
using InventorySystem.Data;
using InventorySystem.Interface;
using InventorySystem.Model;
using System.Data;
using System.Threading.Tasks;
using static InventorySystem.Model.AccountModel;

namespace InventorySystem.QueryRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionFactory _connectionFactory;

        public UserRepository(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<int> InsertOrUpdateUserAsync(AccountModel.UserModel model)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@USERID", model.USERID == 0 ? null : model.USERID, DbType.Int32, ParameterDirection.InputOutput);
                parameters.Add("@USERNAME", model.USERNAME);
                parameters.Add("@EMAIL", model.EMAIL);
                parameters.Add("@PASSWORDHASH", model.PASSWORDHASH);
                parameters.Add("@MOBILE_NUMBER", model.MOBILE_NUMBER);
                parameters.Add("@AADHAR_NUMBER", model.AADHAR_NUMBER);
                parameters.Add("@ADDRESS", model.ADDRESS);
                parameters.Add("@USERROLE", model.USERROLEID == 0 ? null : model.USERROLEID);

                await connection.ExecuteAsync("USP_INSERTORUPDATEUSER", parameters, commandType: CommandType.StoredProcedure);

                return parameters.Get<int?>("@USERID") ?? 0;
            }
        }

        public async Task<UserModel?> GetUserByEmailAsync(string email)
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string sql = @"SELECT USERID,USERNAME,PASSWORDHASH,EMAIL,ISACTIVE,CREATEDAT,MOBILE_NUMBER,AADHAR_NUMBER,ADDRESS FROM Users WHERE EMAIL = @Email AND ISACTIVE = 1";
                return await connection.QueryFirstOrDefaultAsync<UserModel>(sql, new { Email = email });
            }
        }

        public async Task<UserModel?> GetUserDetailsAsync()
        {
            using (var connection = _connectionFactory.CreateConnection())
            {
                string sql = @"SELECT USERID,USERNAME,EMAIL,ISACTIVE,CREATEDAT,MOBILE_NUMBER,AADHAR_NUMBER,ADDRESS FROM Users WHERE ISACTIVE = 1";
                return await connection.QueryFirstOrDefaultAsync<UserModel>(sql);
            }
        }
    }
}
