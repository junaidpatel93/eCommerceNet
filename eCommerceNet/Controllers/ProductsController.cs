using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceDotNet.Controllers
{
    public class ProductDetails
    {
        public Product Product { get; set; }
    }

    [Route("[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext context;
        public ProductsController(AppDbContext appDbContext) => context = appDbContext;
        
        // GET: /GetProducts
        [HttpGet]
        public async Task<List<Product>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{category}", Name = "GetProducts")]
        public async Task<List<Product>> GetProducts(string category)
        {
            IQueryable<Product> ls = context.Products.Where(p => p.Category == category);
            await HttpContext.Session.LoadAsync();
            if(!HttpContext.Session.TryGetValue("userId",out byte[] i))
            {
                HttpContext.Session.SetInt32("userId", GetRandom());
                await HttpContext.Session.CommitAsync();
            }
            return await ls.ToListAsync();
        }

        //GET: api/GetProductDetails/5
        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ProductDetails> GetProductDetails(string id)
        {
            var product = new ProductDetails() { };
            int intID;
            int.TryParse(id, out intID);
            await HttpContext.Session.LoadAsync();
            IQueryable<Product> ls = context.Products.Where(p => p.Id == intID);
            product.Product = ls.First();
            return product;
        }
        
        private int GetRandom()
        {
            Random random = new Random();
            int num = random.Next(1000, 100000000);
            return num;
        }
    }
}
