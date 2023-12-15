import Order from "../../entity/order";
import OrderItem from "../../entity/order_item";

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
    const item = new OrderItem("1", "item 1", 100);
    const item2 = new OrderItem("2", "item 2", 20);
    const order = new Order("1", "1", [item]);

    let total = order.total();

    expect(total).toBe(100);
    const order2 = new Order("2", "2", [item, item2]);
    total = order2.total();

    expect(total).toBe(120);
  });
});
