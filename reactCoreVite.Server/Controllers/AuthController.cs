using InventorySystem.Common;
using InventorySystem.Interface;
using InventorySystem.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static InventorySystem.Model.AccountModel;

namespace reactCoreVite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly InventorySystem.Common.IEmailService _emailService;
        private readonly IPasswordHasher<UserModel> _passwordHasher;

        public AuthController(IUserRepository userRepository, IPasswordHasher<UserModel> passwordHasher, InventorySystem.Common.IEmailService emailService)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
        }

        /// <summary>
        /// User Login
        /// </summary>
        [HttpPost("login")]   //Correct attribute for Swagger/API call
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.EMAIL) || string.IsNullOrWhiteSpace(model.PASSWORDHASH))
            {
                return BadRequest(new
                {
                    messagecode = "400",
                    message = "Invalid login request"
                });
            }

            // Get user by email
            var user = await _userRepository.GetUserByEmailAsync(model.EMAIL);

            if (user == null)
            {
                return Unauthorized(new
                {
                    messagecode = "401",
                    message = "Invalid credentials"
                });
            }

            // Verify password
            var result = _passwordHasher.VerifyHashedPassword(user, user.PASSWORDHASH, model.PASSWORDHASH);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    messagecode = "401",
                    message = "Invalid credentials"
                });
            }

            // Send mail (login notification)
            await _emailService.SendEmailAsync(
                user.EMAIL,
                "Login Notification",
                $"Hello {user.USERNAME},<br/>You have successfully logged in at {DateTime.Now}."
            );

            return Ok(new
            {
                messagecode = "200",
                message = "Login Successfully..!",
                user = new { user.USERNAME, user.EMAIL, user.USERROLEID }
            });
        }

        ///// <summary>
        ///// Create New User
        ///// </summary>
        //[HttpPost("newusercreate")]   //Correct API route
        //public async Task<IActionResult> NewUserCreate([FromBody] UserModel model)
        //{
        //    if (model == null)
        //    {
        //        return BadRequest(new
        //        {
        //            messagecode = "400",
        //            message = "Invalid request"
        //        });
        //    }

        //    var objModel = new UserModel
        //    {
        //        USERNAME = model.USERNAME,
        //        EMAIL = model.EMAIL,
        //        MOBILE_NUMBER = model.MOBILE_NUMBER,
        //        AADHAR_NUMBER = model.AADHAR_NUMBER,
        //        ADDRESS = model.ADDRESS,
        //        ISACTIVE = 1,
        //        CREATEDAT = DateTime.UtcNow,
        //        UPDATEDAT = DateTime.UtcNow,
        //        USERROLEID = model.USERROLEID,
        //    };

        //    // Hash password securely
        //    objModel.PASSWORDHASH = _passwordHasher.HashPassword(objModel, model.PASSWORDHASH);

        //    int newUserId = await _userRepository.InsertOrUpdateUserAsync(objModel);

        //    if (newUserId <= 0)
        //    {
        //        return StatusCode(500, new
        //        {
        //            messagecode = "500",
        //            message = "User creation failed"
        //        });
        //    }

        //    return Ok(new
        //    {
        //        messagecode = "200",
        //        message = "User created successfully 🎉",
        //        userid = newUserId,
        //        data = objModel
        //    });
        //}
    }
}
