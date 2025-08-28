using static InventorySystem.Model.AccountModel;

namespace InventorySystem.Interface
{
    public interface IUserRepository
    {
        Task<int> InsertOrUpdateUserAsync(UserModel model);
        Task<UserModel?> GetUserByEmailAsync(string email);
    }

}
