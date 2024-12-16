using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using task2.Models;
public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

// Define DbSets for your tables
public DbSet<PasswordModel> PasswordModel { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    // Configure relationships, keys, etc.
}
}