using System;
using System.Diagnostics.SymbolStore;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;

namespace M2ShipmentChannel
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("*******************");
            try
            {

                var factory = new ConnectionFactory { HostName = "rabbitmq" };
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "magento2_shipment",
                        durable: true,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null);

                    channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

                    Console.WriteLine(" [*] Waiting for messages.");

                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        try
                        {
                            var body = ea.Body;
                            var message = Encoding.UTF8.GetString(body);
                            var response = JsonConvert.DeserializeObject<Shipment>(message);

                            Console.WriteLine(" [x] Received {0}", message);
                            Console.WriteLine(" [x] Done");

                            MagentoRestClient.PostMessage(response);

                            channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                        }
                        catch (Exception exc)
                        {
                            Console.WriteLine(exc.Message);
                            Thread.Sleep(Timeout.Infinite);
                        }
                    };
                    channel.BasicConsume(queue: "magento2_shipment",
                        autoAck: false,
                        consumer: consumer);

                    Console.WriteLine(" Press [enter] to exit.");
                    Console.ReadLine();
                    Thread.Sleep(Timeout.Infinite);

                    //channel.ExchangeDeclare(exchange: "magento2",
                    //    type: "direct", durable: true);
                    //var queueName = channel.QueueDeclare(durable: true).QueueName;

                    //channel.QueueBind(queue: queueName,
                    //    exchange: "magento2",
                    //    routingKey: "shipment");

                    //Console.WriteLine(" [*] Waiting for Shipment messages.");

                    //var consumer = new EventingBasicConsumer(channel);
                    //consumer.Received += (model, ea) =>
                    //{
                    //    var body = ea.Body;
                    //    var message = Encoding.UTF8.GetString(body);
                    //    var routingKey = ea.RoutingKey;
                    //    Console.WriteLine(" [x] Received '{0}':'{1}'",
                    //        routingKey, message);
                    //};
                    //channel.BasicConsume(queue: queueName, 
                    //    autoAck: true,
                    //    consumer: consumer);

                    //Console.WriteLine(" Press [enter] to exit.");
                    //Console.ReadLine();
                }
            }
            catch (Exception exc)
            {
                Console.WriteLine($"&&&& {exc.Message} &&&&&");
            }
          
        }

    }
}