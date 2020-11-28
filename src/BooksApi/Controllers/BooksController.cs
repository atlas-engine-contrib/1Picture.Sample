using BooksApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace BooksApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ILogger<BooksController> _logger;
        public List<Book> Books { get; set; }

        public BooksController(ILogger<BooksController> logger)
        {
            _logger = logger;

            try
            {
                string json = System.IO.File.ReadAllText("books.json");
                Books = JsonConvert.DeserializeObject<List<Book>>(json);
            }
            catch
            {
                logger.LogError("Die Datei 'books.json' konnte nicht gefunden werden.");
            }
        }

        [HttpGet]
        [HttpGet("search/")]
        public IEnumerable<Book> Get()
        {
            return Books.OrderBy(book => book.Title);
        }

        [HttpGet("{isbn}")]
        [HttpGet("isbn/{isbn}")]
        public Book GetByIsbn(string isbn)
        {
            return Books.Find(book => book.Isbn.ToLower().Replace("-", "").Equals(isbn.ToLower().Replace("-", "")));
        }

        [HttpGet("search/{searchString}")]
        public IEnumerable<Book> SearchBook(string searchString)
        {
            return Books.FindAll(book =>
                book.Isbn.ToLower().Contains(searchString.ToLower()) ||
                book.Title.ToLower().Contains(searchString.ToLower()) ||
                book.Author.ToLower().Contains(searchString.ToLower()) ||
                book.Genre.ToLower().Replace("-", "").Contains(searchString.ToLower().Replace("-", ""))
            ).OrderBy(book => book.Title);
        }
    }
}
