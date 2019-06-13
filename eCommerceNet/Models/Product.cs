using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceDotNet.Models
{
    public class Product
    {

        public int Id { get; set; }
        public string BrandName { get; set; }
        public string ProdName { get; set; }
        public string ImageLink { get; set; }
        public string Category { get; set; }
        public string CostPrice { get; set; }
        public string SalePrice { get; set; }
        public string Details { get; set; }
        public int Rating { get; set; }
        public string _collection { get; set; }
    }
}
