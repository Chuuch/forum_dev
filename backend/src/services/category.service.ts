import Category, { CategoryAttributes, CategoryCreationAttributes } from "../../models/category.model";

export const createCategory = async (data: CategoryCreationAttributes): Promise<Category> => {
  return await Category.create(data);
};

export const getAllCategories = async (): Promise<Category[]> => {
  return await Category.findAll();
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  return await Category.findByPk(id);
};

export const updateCategory = async (id: string, updates: Partial<CategoryAttributes>): Promise<Category | null> => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update(updates);
  return category;
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  const deleted = await Category.destroy({ where: { id } });
  return !!deleted;
};
