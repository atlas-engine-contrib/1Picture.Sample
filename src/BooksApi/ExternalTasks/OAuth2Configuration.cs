namespace BooksApi.ExternalTasks
{
    public class OAuth2Configuration
    {
        public string Authority { get; set; }

        public string ClientId { get; set; }

        public string Scopes { get; set; }

        public string GrantType { get; set; }

        public string ClientSecret { get; set; }
    }
}
