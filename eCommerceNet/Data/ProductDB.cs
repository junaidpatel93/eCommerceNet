using eCommerceDotNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceDotNet.Data
{
    public class ProductDB
    {

        public List<Product> list;

        public ProductDB()
        {

            list = new List<Product>();
            Product p1 = new Product();
            p1.BrandName = "Levi's";
            p1.ProdName = "Denim Jeans";
            p1.ImageLink = "https://lsco.scene7.com/is/image/lsco/Levis/clothing/594340000-front-pdp.jpg?$grid_desktop_bottoms$";
            p1.Category = "men";
            p1.CostPrice = "60";
            p1.SalePrice = "43";
            p1.Details = "The Levi's® Hi-Ball Roll Jean is the ultimate jean for sneakers. These streetwear-inspired, cropped jeans will spotlight your fresh kicks with eye-catching, effortless Levi's® style.Style # 594340000";
            p1.Rating = 4;
            p1._collection = "Denims";
            list.Add(p1);

            Product p2 = new Product();
            p2.BrandName = "Levi's";
            p2.ProdName = "Women's denim jeans";
            p2.ImageLink = "https://lsco.scene7.com/is/image/lsco/Levis/clothing/359050003-front-pdp.jpg?$grid_desktop_bottoms$";
            p2.Category = "women";
            p2.CostPrice = "60";
            p2.SalePrice = "23";
            p2.Details = "The Levi's® Hi-Ball Roll Jean is the ultimate jean for sneakers. These streetwear-inspired, cropped jeans will spotlight your fresh kicks with eye-catching, effortless Levi's® style.Style # 594340000";
            p2.Rating = 4;
            p2._collection = "Denims";
            list.Add(p2);

            Product p3 = new Product();
            p3.BrandName = "Levi's";
            p3.ProdName = "Jacket";
            p3.ImageLink = "https://lsco.scene7.com/is/image/lsco/Levis/clothing/299440000-front-pdp.jpg?$grid_desktop_full$";
            p3.Category = "women";
            p3.CostPrice = "89";
            p3.SalePrice = "43";
            p3.Details = "The Levi's® Hi-Ball Roll Jean is the ultimate jean for sneakers. These streetwear-inspired, cropped jeans will spotlight your fresh kicks with eye-catching, effortless Levi's® style.Style # 594340000";
            p3.Rating = 4;
            p3._collection = "Outerwear";
            list.Add(p3);

            Product p4 = new Product();
            p4.BrandName = "UA";
            p4.ProdName = "T-Shirt";
            p4.ImageLink = "https://underarmour.scene7.com/is/image/Underarmour/V5-1326413-002_BC?template=v65GridLarge&$wid=281&$hei=345";
            p4.Category = "kids";
            p4.CostPrice = "96";
            p4.SalePrice = "80";
            p4.Details = "UA Tech™ is our original go-to training gear: loose, light, and it keeps you cool. It's that same great fabric, but this shirt has also been updated with a new, more streamlined fit and a shaped hem. It's everything you need.";
            p4.Rating = 4;
            p4._collection = "Outerwear";
            list.Add(p4);

            Product p5 = new Product();
            p5.BrandName = "Carter";
            p5.ProdName = "Jacket";
            p5.ImageLink = "https://cdn-us-ec.yottaa.net/578855e22bb0ac10350002d6/www.carters.com/v~4b.3c/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dw36e9efd1/productimages/293G231.jpg?sw=244&yocs=1i_W_&yoloc=us";
            p5.Category = "kids";
            p5.CostPrice = "10";
            p5.SalePrice = "8";
            p5.Details = "Crafted in cozy fleece with side-entry pockets, this hoodie is a school year essential.";
            p5.Rating = 4;
            p5._collection = "Outerwear";
            list.Add(p5);

            Product p6 = new Product();
            p6.BrandName = "Express";
            p6.ProdName = "Top";
            p6.ImageLink = "https://images.express.com/is/image/expressfashion/0086_09615303_2167?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon";
            p6.Category = "women";
            p6.CostPrice = "54";
            p6.SalePrice = "32";
            p6.Details = "This shirt fits great and is so easy to wear out.";
            p6.Rating = 4;
            p6._collection = "Denims";
            list.Add(p6);




        }

        public void Add(Product product)
        {
            list.Add(product);
        }
    }
}
