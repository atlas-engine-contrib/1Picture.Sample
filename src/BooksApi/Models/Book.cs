namespace BooksApi.Models
{
    public class Book
    {
        public string Isbn { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public bool IsAvailable { get; set; }
    }
}
