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


        [HttpPost("login")]
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


            var user = await _userRepository.GetUserByEmailAsync(model.EMAIL);

            if (user == null)
            {
                return Unauthorized(new
                {
                    messagecode = "401",
                    message = "Invalid credentials"
                });
            }

            // Verify password (compare plain password with hashed password from DB)
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
            //await _emailService.SendEmailAsync(
            //    user.EMAIL,
            //    "Login Notification",
            //    $"Hello {user.USERNAME},<br/>You have successfully logged in at {DateTime.Now}."
            //);

            return Ok(new
            {
                messagecode = "200",
                message = "Login Successfully..! ",
                user = new { model.EMAIL }
            });

        }

        [HttpPost("newusercreate")]   //Correct API route
        public async Task<IActionResult> NewUserCreate([FromBody] UserModel model)
        {
            if (model == null)
            {
                return BadRequest(new
                {
                    messagecode = "400",
                    message = "Invalid request"
                });
            }

            var objModel = new UserModel
            {
                USERNAME = model.USERNAME,
                EMAIL = model.EMAIL,
                MOBILE_NUMBER = model.MOBILE_NUMBER,
                AADHAR_NUMBER = model.AADHAR_NUMBER,
                ADDRESS = model.ADDRESS,
                ISACTIVE = 1,
                PASSWORDHASH = model.PASSWORDHASH,
                USERROLEID = model.USERROLEID
            };

            // Hash password securely
            objModel.PASSWORDHASH = _passwordHasher.HashPassword(objModel, model.PASSWORDHASH);

            int newUserId = await _userRepository.InsertOrUpdateUserAsync(objModel);

            if (newUserId <= 0)
            {
                return StatusCode(500, new
                {
                    messagecode = "500",
                    message = "User creation failed"
                });
            }

            return Ok(new
            {
                messagecode = "200",
                message = "User created successfully",
                userid = newUserId,
                data = objModel
            });
        }

        [HttpGet("getdetails")]
        public async Task<IActionResult> GetDetails()
        {
            var user = await _userRepository.GetUserDetailsAsync(); // fixed typo

            if (user == null)
            {
                return StatusCode(401, new
                {
                    messagecode = "401",
                    message = "Invalid credentials"
                });
            }

            return Ok(new
            {
                messagecode = "200",
                message = "Login Successfully..! ",
                user  //returns the full user list
            });
        }

    }
}
