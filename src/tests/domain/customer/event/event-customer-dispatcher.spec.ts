import EventDispatcher from "../../../../domain/@shared/event-dispatcher";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerAddressChangedEvent from "../../../../domain/customer/event/customer-address-changed-event";
import CustomerCreatedEvent from "../../../../domain/customer/event/customer-created.event";
import CustomerAddressChangedHandler from "../../../../domain/customer/event/hendler/customer-address-changed.handler";
import CustomerCreatedHandler1 from "../../../../domain/customer/event/hendler/customer-created.handler1";
import CustomerCreatedHandler2 from "../../../../domain/customer/event/hendler/customer-created.handler2";
import Address from "../../../../domain/customer/value-object/address";

describe("Domain customer events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedHandler1 = new CustomerCreatedHandler1();
    const customerCreatedHandler2 = new CustomerCreatedHandler2();
    const spy = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
    eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);

    new Customer("1", "Customer");
    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });

  it("should a message when address of a customer is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChange = new CustomerAddressChangedHandler();
    const spy = jest.spyOn(console, "log");

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      customerAddressChange
    );

    const customer = new Customer("1", "Customer");
    const address = new Address("street", "1", "20701-900", "City");

    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      "Endereço do cliente: 1, Customer alterado para: street, 1, 20701-900, City"
    );
  });
});
