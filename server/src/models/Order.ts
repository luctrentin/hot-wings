import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  address: string;
  paymentMethod: string;
}

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    items: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: [true, 'Please provide the total amount'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'delivered', 'cancelled'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    address: {
      type: String,
      required: [true, 'Please provide the delivery address'],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['cash', 'card'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Please provide a payment method'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema); 