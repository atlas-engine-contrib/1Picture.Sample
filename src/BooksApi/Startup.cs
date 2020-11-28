using AtlasEngine;
using AtlasEngine.ApiClient;
using AtlasEngine.Identities;
using BooksApi.ExternalTasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace BooksApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public IConfiguration Configuration { get; }

        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                    });
            });
            services.AddControllers();

            services.Configure<ApiClientSettings>(Configuration.GetSection("ExternalTaskWorker"));

            if (!Environment.IsDevelopment())
            {
                services.Configure<OAuth2Configuration>(Configuration.GetSection("Oauth2Configuration"));

                services.AddSingleton<TokenIdentityAccessor>();
                services.AddTransient<IIdentityAccessor>(p => p.GetService<TokenIdentityAccessor>());

                services.AddHostedService<TokenIdentityProviderService>();
            }

            services.AddScoped<BibliotheksausweisPruefenHandler>();
            services.AddScoped<FaelligeAusleihenErmittelnHandler>();
            services.AddScoped<BuchausleiheEintragenHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
