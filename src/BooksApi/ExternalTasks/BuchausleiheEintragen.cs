using System.Threading.Tasks;
using AtlasEngine;
using AtlasEngine.ExternalTasks;

namespace BooksApi.ExternalTasks
{

    [ExternalTaskHandler("BuchausleiheEintragen")]
    public class BuchausleiheEintragenHandler : IExternalTaskHandler<BuchausleiheEintragenRequest, BuchausleiheEintragenResponse>
    {
        public Task<BuchausleiheEintragenResponse> HandleAsync(BuchausleiheEintragenRequest input, ExternalTask task)
        {
            return Task.FromResult(new BuchausleiheEintragenResponse());
        }
    }
}
