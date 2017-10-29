using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace M2ShipmentChannel
{
    public class MagentoRestClient
    {
   
        internal static bool PostMessage(Shipment shipment)
        {
            var client = new RestClient("http://app");
            
            // client.Authenticator = new HttpBasicAuthenticator(username, password);

            var request = new RestRequest("/rest/V1/shipment", Method.POST);

            // easily add HTTP Headers
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "Bearer 0ntti6ue2e5dg5sd6reheu2qwxueg5ti");
            request.RequestFormat = DataFormat.Json;

            //var json = JsonConvert.SerializeObject(shipment);
            foreach (var track in shipment.entity.tracks)
            {
                track.carrier_code = track.carrier_code.ToLower();
            }
            request.AddJsonBody(shipment);
      
            client.ExecuteAsync(request, response => {
                //Console.WriteLine(request);
                Console.WriteLine("SUCCESS????????"+ response.StatusCode + "?????" + response.ErrorMessage);
 
                Console.WriteLine("!!!!!!!!!!!!!!!!");
            });

            return true;
        }

        //private string GetToken()
        //{

        //}
    }
}


public class Shipment
{
    public Entity entity { get; set; }
}

public class Entity
{
    public string shippingLabel { get; set; }
    public int orderId { get; set; }
    public Item[] items { get; set; }
    public Track[] tracks { get; set; }
    public Comment[] comments { get; set; }
    public Extensionattributes extensionAttributes { get; set; }
}

public class Extensionattributes
{
}

public class Item
{
    public int orderItemId { get; set; }
    public int qty { get; set; }
}

public class Track
{
    public int order_id { get; set; }
    public float weight { get; set; }
    public int qty { get; set; }
    public string description { get; set; }
    public string track_number { get; set; }
    public string title { get; set; }
    public string carrier_code { get; set; }
}

public class Comment
{
    public int isCustomerNotified { get; set; }
    public string comment { get; set; }
    public int isVisibleOnFront { get; set; }
}
