namespace task2.Models
{
    public class PasswordModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string App { get; set; }
        public string UserName { get; set; }
        public string EncryptedPassword { get; set; } 
    }
}
