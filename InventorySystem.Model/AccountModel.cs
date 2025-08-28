namespace InventorySystem.Model
{
    public class AccountModel
    {
        public class LoginModel
        {
            public string PASSWORDHASH { get; set; }
            public string EMAIL { get; set; }
        }

        public class UserModel
        {
            public int USERID { get; set; }
            public int USERROLEID { get; set; }
            public string USERNAME { get; set; }
            public string PASSWORDHASH { get; set; }
            public string EMAIL { get; set; }
            public int ISACTIVE { get; set; }
            public DateTime CREATEDAT { get; set; }
            public DateTime UPDATEDAT { get; set; }
            public string MOBILE_NUMBER { get; set; }
            public string AADHAR_NUMBER { get; set; }
            public string ADDRESS { get; set; }

        }
    }
}
