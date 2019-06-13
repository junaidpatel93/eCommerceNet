using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceDotNet.Models;
using eCommerceNet.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eCommerceDotNet.Controllers
{
    public class UserResponse
    {
        public string Email { get; set; }
    }
    
    public class UserDetails
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Province { get; set; }
    }

    
    [Route("[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext context;
        public UserController(AppDbContext appDbContext)
        {
            context = appDbContext;

        }
        [HttpGet]
        public async Task<UserResponse> GetUser()
        {
            var ur = new UserResponse() { Email = "" };

            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if(userId != null)
                user = await context.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user != null)
                ur.Email = user.Email;

            return ur;
        }
        [HttpGet]
        public async Task<UserDetails> getUserDetails()
        {
            var ur = new UserDetails() { Email = "", Address="", FirstName="", Id= 0, LastName="", Phone="", PostalCode="", Country="", Province="" };

            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if (userId != null)
                user = await context.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                ur.Email = user.Email;
                ur.FirstName = user.FirstName;
                ur.LastName = user.LastName;
                ur.Phone = user.Phone;
                ur.Address = user.Address;
                ur.Id = user.Id;
                ur.PostalCode = user.PostalCode;
                ur.Country = user.Country;
                ur.Province = user.Province;
            }

            return ur;
        }

        // POST: api/User
        [HttpPost]
        public async Task<Response> updateProfile([FromBody] User value)
        {
            var response = new Response() { Success = false, Message =" Try again" };
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if (userId != null)
                user = context.Users.Find(userId);
            if (user != null)
            {
                user.Email = value.Email;
                user.FirstName = value.FirstName;
                user.LastName = value.LastName;
                user.Phone = value.Phone;
                user.Address = value.Address;
                user.PostalCode = value.PostalCode;
                user.Country = value.Country;
                user.Province = value.Province;
                try
                {
                    context.Users.Update(user);
                    context.SaveChanges();
                    response.Message = "Success";
                    response.Success = true;

                }
                catch (Exception e)
                {
                    e.GetType();
                }

            }
            return response;
        }

        
    }
}
