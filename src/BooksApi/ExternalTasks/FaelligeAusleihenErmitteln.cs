using System.Threading.Tasks;
using AtlasEngine;
using AtlasEngine.ExternalTasks;

namespace BooksApi.ExternalTasks
{

    [ExternalTaskHandler("FaelligeAusleihenErmitteln")]
    public class FaelligeAusleihenErmittelnHandler : IExternalTaskHandler<FaelligeAusleihenErmittelnRequest, FaelligeAusleihenErmittelnResponse>
    {
        public Task<FaelligeAusleihenErmittelnResponse> HandleAsync(FaelligeAusleihenErmittelnRequest input, ExternalTask task)
        {
            return Task.FromResult(new FaelligeAusleihenErmittelnResponse() { hatFaelligeAusleihen = false });
        }
    }
}
