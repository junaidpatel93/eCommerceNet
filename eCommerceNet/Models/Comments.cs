using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceDotNet.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int ProductID { get; set; }
        public string CommentDescription { get; set; }
        public int Rating { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
