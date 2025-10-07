import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import {Category,Product} from './models/index.js'
import {categories, products}from './seedData.js'

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Category.deleteMany({});
        const categoryDocs=await Category.insertMany(categories)

        const categoryMap= categoryDocs.reduce((map,Category)=>{
            map[Category.name]= Category._id;
            return map;
        },{})

        const productWithCategoryIds=products.map((product)=>({
            ...product,
            category:categoryMap[product.category],
        }))
        await Product.insertMany(productWithCategoryIds)
        console.log('DataBase Seeded Successfully')
    } catch (error) {
        console.error('Error seeding database',error)
    }finally{
        mongoose.connection.close();
    }
}

seedDatabase();