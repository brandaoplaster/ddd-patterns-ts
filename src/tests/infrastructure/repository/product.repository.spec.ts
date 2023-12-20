import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequilize/model/product.model";
import Product from "../../../domain/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "product 1",
      price: 100
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "product 1",
      price: 100
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 2",
      price: 200
    });
  });
});
