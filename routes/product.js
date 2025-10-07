import {getAllCategories} from '../controllers/product/category.js';
import {getProductByCategoryId} from "../controllers/product/product.js";

export const categoryRoutes=async(fastify,Options)=>{
    fastify.get('/categories',getAllCategories);
}

export const productRoutes=async(fastify,Options)=>{
    fastify.get('/products/:categoryId',getProductByCategoryId);
}