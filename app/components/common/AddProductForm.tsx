import { de, faker } from "@faker-js/faker";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductTypes } from "@/app/types/productTypes";
type AddProductFormProps = {
  onSubmit: (data: any) => void;
  onClose: () => void;
  title ?:string;
};

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.preprocess(
    (value) => Number(value),
    z.number().positive("Price must be a valid number")
  ),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});
const AddProductForm = ({ onSubmit, onClose,title }: AddProductFormProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductTypes>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        title: title ?? "",
        price: 0,
        description: "",
        category: "",
      },
  });
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        <form
          onSubmit={handleSubmit((data) => {
            data.id = faker.number.int({ max: 100 })
            onSubmit(data);
            onClose();
          })}
        >
          {/* title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-white text-sm font-medium">
              Title
            </label>
            <input
            id="title"
              {...register("title")}
              className=" w-full border text-black p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          {/* price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-white text-sm font-medium">
              Price
            </label>
            <input
            id="price"
              {...register("price")}
              className=" w-full border text-black p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          {/* desc */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-white text-sm font-medium">
              Description
            </label>
            <input
            id="description"
              {...register("description")}
              className=" w-full border text-black p-2 rounded"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          {/* category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-white text-sm font-medium">
              Category
            </label>
            <input
            id="category"
              {...register("category")}
              className=" w-full border text-black p-2 rounded"
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </Button>
            <Button
              data-testid="submit-button"
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
 