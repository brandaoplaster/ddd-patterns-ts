import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/db/sequilize/model/customer.model";
import OrderItemModel from "../../../infrastructure/db/sequilize/model/order-item.model";
import OrderModel from "../../../infrastructure/db/sequilize/model/order.model";
import ProductModel from "../../../infrastructure/db/sequilize/model/product.model";
import OrderRepository from "../../../infrastructure/repository/order.repository";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import Order from "../../../domain/entity/order";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import Product from "../../../domain/entity/product";
import OrderItem from "../../../domain/entity/order_item";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("street", "1", "zipcode", "city");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "product", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", "1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quanity,
          order_id: "1",
          product_id: "1",
        }
      ]
    });
  });
});
