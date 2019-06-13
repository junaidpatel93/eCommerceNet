using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eCommerceDotNet.Controllers
{
    public class CommentsRes
    {
        public List<User> Users { get; set; }
        public List<Comments> Results { get; set; }
        
    }
    public class PostComment
    {
        public string CommentDescription { get; set; }
        public string Rating { get; set; }
        public int ProductID { set; get; }
    }
    [Route("[action]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext context;
        public CommentsController(AppDbContext appDbContext) => context = appDbContext;

        [HttpGet("{productID}", Name = "GetComments")]
        public CommentsRes GetComments(string productID)
        {
            var res = new CommentsRes { Results = new List<Comments>(), Users = new List<User>() };
            res.Results = context.Comments.Where(p => p.ProductID == int.Parse(productID)).ToList();
            res.Users = context.Users.ToList();
            return res;
        }

        [HttpPost]
        public async Task<Response> PostComments([FromBody] PostComment Req)
        {
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            var Comment = new Comments();
            Comment.CommentDescription = Req.CommentDescription;
            Comment.ProductID = Req.ProductID;
            Comment.UserID = (int)userId;
            Comment.Rating = int.Parse(Req.Rating);
            Comment.UpdatedAt = DateTime.Now;

            context.Comments.Add(Comment);

            await context.SaveChangesAsync();
            return new Response { Success= true,Message="Done"};



        }
    }
}
