import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    if (products.length === 0) {
      throw new AppError(
        'Its not possible to create an order without products',
      );
    }

    const productsIds = products.map(product => ({ id: product.id }));
    const productsList = await this.productsRepository.findAllById(productsIds);
    const orderProducts = products.map(product => {
      const productDbIndex = productsList.findIndex(p => p.id === product.id);

      if (productDbIndex === -1) {
        throw new AppError(`Product with id ${product.id} not found`);
      }

      const productDb = productsList[productDbIndex];

      if (product.quantity > productDb.quantity) {
        throw new AppError('Insufficient stock quantity');
      }

      productsList[productDbIndex].quantity =
        productDb.quantity - product.quantity;

      return {
        product_id: product.id,
        quantity: product.quantity,
        price: productDb.price,
      };
    });

    await this.productsRepository.updateQuantity(productsList);

    const order = await this.ordersRepository.create({
      customer,
      products: orderProducts,
    });

    return order;
  }
}

export default CreateProductService;
