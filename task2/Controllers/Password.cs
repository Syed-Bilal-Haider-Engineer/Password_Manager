using Microsoft.AspNetCore.Mvc;
using task2.Models;
using System.Linq;

namespace task2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public PasswordController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public static string EncryptPassword(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }

        public string DecryptPassword(string encodedData)
        {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encodedData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }

        // 1. Add PasswordUser (POST)
        [HttpPost("add")]
        public IActionResult AddPasswordUser([FromBody] PasswordModel passwordModel)
        {
            if (passwordModel == null || string.IsNullOrEmpty(passwordModel.EncryptedPassword))
            {
                return BadRequest("Password data is required.");
            }
            Console.WriteLine(passwordModel.EncryptedPassword, "passwordModel");
            passwordModel.EncryptedPassword = EncryptPassword(passwordModel.EncryptedPassword);

            _dbContext.PasswordModel.Add(passwordModel); // Updated to match table name
            _dbContext.SaveChanges();
            return Ok("PasswordUser added successfully.");
        }

        // 2. Get One PasswordUser by ID (GET)
        [HttpGet("{id}")]
        public IActionResult GetPasswordUser(int id)
        {
            var passwordUser = _dbContext.PasswordModel.FirstOrDefault(p => p.Id == id); // Updated to match table name

            if (passwordUser == null)
            {
                return NotFound("PasswordUser not found.");
            }

            passwordUser.EncryptedPassword = DecryptPassword(passwordUser.EncryptedPassword);

            return Ok(passwordUser);
        }

        // 3. Get All PasswordUsers (GET)
        [HttpGet("all")]
        public IActionResult GetAllPasswordUsers()
        {
            var passwordUsers = _dbContext.PasswordModel.ToList(); // Updated to match table name
            Console.WriteLine("This is a message printed to the console.", passwordUsers);

            if (passwordUsers == null || !passwordUsers.Any())
            {
                return NotFound("No PasswordUsers found.");
            }

            foreach (var passwordUser in passwordUsers)
            {
                passwordUser.EncryptedPassword = DecryptPassword(passwordUser.EncryptedPassword);
            }

            return Ok(passwordUsers);
        }

        // 4. Update PasswordUser (PUT)
        [HttpPut("{id}")]
        public IActionResult UpdatePasswordUser(int id, [FromBody] PasswordModel updatedPasswordModel)
        {
            var existingPasswordUser = _dbContext.PasswordModel.FirstOrDefault(p => p.Id == id); // Updated to match table name

            if (existingPasswordUser == null)
            {
                return NotFound("PasswordUser not found.");
            }

            existingPasswordUser.Category = updatedPasswordModel.Category;
            existingPasswordUser.App = updatedPasswordModel.App;
            existingPasswordUser.UserName = updatedPasswordModel.UserName;
            existingPasswordUser.EncryptedPassword = EncryptPassword(updatedPasswordModel.EncryptedPassword);

            _dbContext.SaveChanges();

            return Ok("PasswordUser updated successfully.");
        }

        // 5. Delete PasswordUser (DELETE)
        [HttpDelete("{id}")]
        public IActionResult DeletePasswordUser(int id)
        {
            var passwordUser = _dbContext.PasswordModel.FirstOrDefault(p => p.Id == id); // Updated to match table name

            if (passwordUser == null)
            {
                return NotFound("PasswordUser not found.");
            }

            _dbContext.PasswordModel.Remove(passwordUser); // Updated to match table name
            _dbContext.SaveChanges();

            return Ok("PasswordUser deleted successfully.");
        }
    }
}
