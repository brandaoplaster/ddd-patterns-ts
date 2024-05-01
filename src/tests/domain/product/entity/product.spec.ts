import Product from "../../../../domain/product/entity/product";

describe("Product unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "product", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      const product = new Product("123", "product", -1);
    }).toThrow("Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "product", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "product", 10);
    product.changePrice(100);
    expect(product.price).toBe(100);
  });
});
