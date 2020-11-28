using System.Threading.Tasks;
using AtlasEngine;
using AtlasEngine.ExternalTasks;

namespace BooksApi.ExternalTasks
{
    [ExternalTaskHandler("BibliotheksausweisPruefen")]
    public class BibliotheksausweisPruefenHandler : IExternalTaskHandler<BibliotheksausweisPruefenRequest, BibliotheksausweisPruefenResponse>
    {
        public Task<BibliotheksausweisPruefenResponse> HandleAsync(BibliotheksausweisPruefenRequest input, ExternalTask task)
        {
            return Task.FromResult(new BibliotheksausweisPruefenResponse() { AusweisVorhanden = false });
        }
    }
}
