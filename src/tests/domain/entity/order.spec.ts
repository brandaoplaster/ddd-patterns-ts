import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("1234", "", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("1234", "1234", []);
    }).toThrow("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 2);
    const order = new Order("1", "1", [item]);

    let total = order.total();

    expect(total).toBe(200);
    const order2 = new Order("2", "2", [item, item2]);
    total = order2.total();

    expect(total).toBe(600);
  });

  it("should throw error if the item quantity is greater than 0", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 100, "p1", 0);
      const order = new Order("1", "1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
