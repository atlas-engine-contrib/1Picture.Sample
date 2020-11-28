namespace BooksApi.ExternalTasks
{
    using System.Threading;
    using AtlasEngine.Identities;

    internal sealed class TokenIdentityAccessor : IIdentityAccessor
    {
        private CancellationTokenSource hasChangedSource;

        public TokenIdentityAccessor()
        {
            this.Identity = AnonymousIdentity.Instance;
            this.hasChangedSource = new CancellationTokenSource();
        }

        public IIdentity Identity { get; private set; }

        public CancellationToken HasChanged => this.hasChangedSource.Token;

        public void UpdateIdentity(IIdentity newIdentity)
        {
            this.Identity = newIdentity;

            var currentHasChangedSource = this.hasChangedSource;
            this.hasChangedSource = new CancellationTokenSource();
            currentHasChangedSource.Cancel();
        }
    }
}
