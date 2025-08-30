using InventorySystem.Common;
using InventorySystem.Data;
using InventorySystem.Interface;
using InventorySystem.QueryRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using static InventorySystem.Model.AccountModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddEndpointsApiExplorer();

// Swagger with OpenAPI info
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "API",
        Version = "v1",
        Description = "Inventory System API"
    });
});

// Register connection factory
builder.Services.AddScoped<IDbConnectionFactory>(sp =>
    new SqlDbConnectionFactory(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Register password hasher
builder.Services.AddScoped<IPasswordHasher<UserModel>, PasswordHasher<UserModel>>();

// (Optional) Register your Email service if used
builder.Services.AddScoped<InventorySystem.Common.IEmailService, EmailService>();

var app = builder.Build();

// Middleware order matters!
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthorization();

// Swagger middlewares
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Inventory System API V1");
    c.RoutePrefix = "swagger"; // URL: /swagger
});

// Map API Controllers
app.MapControllers();

// React SPA fallback routing
app.MapFallbackToFile("index.html");

app.Run();
