using InventorySystem.Data;
using InventorySystem.QueryRepository;
using InventorySystem.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Read base path (virtual directory) from appsettings.json
var basePath = builder.Configuration["AppSettings:SwaggerBasePath"] ?? "";

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
        Title = "My API",
        Version = "v1",
        Description = "My Inventory System API"
    });
});

// Register connection factory
builder.Services.AddScoped<IDbConnectionFactory>(sp =>
    new SqlDbConnectionFactory(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Access configuration
IConfiguration configuration = builder.Configuration;

var app = builder.Build();

// Use PathBase if deploying under a virtual directory
if (!string.IsNullOrEmpty(basePath))
{
    app.UsePathBase(basePath);
}

// Middleware order matters!
app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

// Serve React static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger middlewares
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    // Ensure basePath is trimmed of trailing slashes
    var swaggerBasePath = basePath.TrimEnd('/');

    c.SwaggerEndpoint($"{swaggerBasePath}/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = "swagger"; // URL: /<basePath>/swagger
});

// Map API Controllers
app.MapControllers();

// React SPA fallback routing
app.MapFallbackToFile("index.html");

app.Run();
