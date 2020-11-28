namespace BooksApi.ExternalTasks
{
    public class ExternalTaskConfig
    {
        public string ProcessEngineAddress { get; set; }

        public bool? IsLocalDebugging { get; set; }

        public string GoogleCredentialsFile { get; set; }

        public string EmailSender { get; set; }

        public string EmailSenderPassword { get; set; }

        public string EmailReceiversTo { get; set; }

        public string EmailReceiversCc { get; set; }

        public OAuth2Configuration Oauth2Configuration { get; set; }

    }
}
