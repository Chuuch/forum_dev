import { Request, Response } from "express";
import Category from "../../models/category.model";

export const categoryController = {
    // Get all categories
    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Error fetching categories" });
        }
    },

    // Create a new category
    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            if (!name) {
                res.status(400).json({ message: "Category name is required" });
                return;
            }

            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Error creating category" });
        }
    },

    // Update a category
    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                res.status(400).json({ message: "Category name is required" });
                return;
            }

            const category = await Category.findByPk(id);
            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }

            await category.update({ name });
            res.json(category);
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ message: "Error updating category" });
        }
    },

    // Delete a category
    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            
            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }

            await category.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Error deleting category" });
        }
    }
}; 