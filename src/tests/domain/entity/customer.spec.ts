import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";

describe("Customer unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Paul");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1234", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    let customer = new Customer("1234", "Paul");
    customer.changeName("Mike");
    expect(customer.name).toBe("Mike");
  });

  it("should activate customer", () => {
    const customer = new Customer("1234", "Paul");
    const address = new Address("street 1", "1234", "1234", "Curitiba");
    customer.Address = address;
    customer.activete();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1234", "Paul");
      customer.activete();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1234", "Paul");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
});
