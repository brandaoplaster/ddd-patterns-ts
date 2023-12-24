import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../../infrastructure/db/sequilize/model/order.model";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
