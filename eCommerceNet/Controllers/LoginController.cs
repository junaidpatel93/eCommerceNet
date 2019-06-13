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
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class ChangePass
    {
        public string Email;
        public string CurrentPassword;
        public string NewPassword;
    }
    [Route("[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext context;

        public LoginController(AppDbContext appDbContext)
        {
            context = appDbContext;

            if (context.Users.Count() == 0)
            {
                var password = PasswordHash.HashPassword("qwer");
                context.Users.Add(new Models.User { Email = "jp@abc.com", Password = password });
                context.SaveChanges();
            }
        }

        [HttpPost]
        public async Task<Response> Login([FromBody] Login login)
        {
            var r = new Response { Success = false, Message = "try again" };

            //see if email matches a user
            User user = await context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);
            if (user != null)
                //see if password matches that user
                r.Success = PasswordHash.VerifyHashedPassword(user.Password, login.Password);

            if (r.Success)
            {
                r.Message = "Done";
                await HttpContext.Session.LoadAsync();
                HttpContext.Session.SetInt32("userId", user.Id);
                await HttpContext.Session.CommitAsync();
            }

            return r;
        }

        
        [HttpPost]
        public async Task<Response> Register([FromBody] Login login)
        {
            
            var r = new Response { Success = false, Message = "Please try again with the correct inputs" };
            if (login.Email != null && login.Password != null)
            {
                var password = PasswordHash.HashPassword(login.Password);
                var user = context.Users.Add(new Models.User { Email = login.Email, Password = password });
                int result = context.SaveChanges();
                if(result == 1)
                {
                    r.Message = "Done";
                    r.Success = true;
                }
            }
            if (r.Success)
            {
                User user = await context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);
                await HttpContext.Session.LoadAsync();
                HttpContext.Session.SetInt32("userId", user.Id);
                await HttpContext.Session.CommitAsync();
            }

            return r;
        }

        [HttpPost]
        public async Task<Response> ChangePassword([FromBody] ChangePass value)
        {
            var response = new Response() { Success = false, Message = " Try again" };
            await HttpContext.Session.LoadAsync();
            var userId = HttpContext.Session.GetInt32("userId");
            User user = null;
            if (userId != null)
                user = context.Users.Find(userId);
            Console.WriteLine(user.Email);
            if (user != null)
            {
                var newHashPassword = PasswordHash.HashPassword(value.NewPassword);
                response.Success = PasswordHash.VerifyHashedPassword(user.Password, value.CurrentPassword);
                if (response.Success)
                {
                    user.Password = newHashPassword;
                }

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
