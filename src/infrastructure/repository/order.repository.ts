import { Sequelize } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderItemModel from "../db/sequilize/model/order-item.model";
import OrderModel from "../db/sequilize/model/order.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [OrderItemModel],
    });

    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const order = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return order.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize as Sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }
}
