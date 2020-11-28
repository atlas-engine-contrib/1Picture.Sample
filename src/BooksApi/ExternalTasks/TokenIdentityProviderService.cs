namespace BooksApi.ExternalTasks
{

    using System;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using AtlasEngine.Identities;
    using IdentityModel.Client;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Options;

    internal sealed class TokenIdentityProviderService : IHostedService
    {
        private const int TokenRefreshBufferInSeconds = 5;
        private readonly TokenIdentityAccessor tokenIdentityAccessor;
        private readonly CancellationTokenSource stopSignalSource;
        private readonly OAuth2Configuration config;

        public TokenIdentityProviderService(
            TokenIdentityAccessor tokenIdentityAccessor,
            IOptions<OAuth2Configuration> configAccessor)
        {
            this.tokenIdentityAccessor = tokenIdentityAccessor;
            this.config = configAccessor.Value;
            this.stopSignalSource = new CancellationTokenSource();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _ = Task.Run(this.StartRefreshingAsync);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            this.stopSignalSource?.Cancel();
            return Task.CompletedTask;
        }

        private async Task StartRefreshingAsync()
        {
            Console.WriteLine("StartRefreshingAsync");
            var tokenEndpoint = await this.GetTokenEndpointAsync();
            var stopSignal = this.stopSignalSource.Token;

            Console.WriteLine($"stopSignal.IsCancellationRequested {stopSignal.IsCancellationRequested}");
            while (!stopSignal.IsCancellationRequested)
            {
                Console.WriteLine("Test");
                Console.WriteLine(tokenEndpoint);
                var (accessToken, secondsToExpiration) = await this.GetTokenAsync(tokenEndpoint);

                Console.WriteLine(accessToken);

                this.tokenIdentityAccessor.UpdateIdentity(new SimpleIdentity
                {
                    UserId = "Atlas Engine Identity",
                    Token = accessToken
                });

                var timeToExpiration = TimeSpan.FromSeconds(secondsToExpiration);
                var refreshThreshold = TimeSpan.FromSeconds(TokenRefreshBufferInSeconds);
                var timeToRefresh = timeToExpiration - refreshThreshold;

                await Task.Delay(timeToRefresh);
            }
        }

        private async Task<string> GetTokenEndpointAsync()
        {
            var client = new HttpClient();
            var discoveryResponse = await client.GetDiscoveryDocumentAsync(this.config.Authority);

            if (discoveryResponse.IsError)
            {
                throw new Exception(discoveryResponse.Error);
            }

            return discoveryResponse.TokenEndpoint;
        }

        private async Task<(string accessToken, int expiresIn)> GetTokenAsync(string tokenEndpoint)
        {
            var client = new HttpClient();

            var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
            {
                Address = tokenEndpoint,
                ClientId = this.config.ClientId,
                ClientSecret = this.config.ClientSecret,
                Scope = ""
            });

            if (tokenResponse.IsError)
            {
                throw new Exception(tokenResponse.Error);
            }

            return (tokenResponse.AccessToken, tokenResponse.ExpiresIn);
        }
    }
}
