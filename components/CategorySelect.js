import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";

export default function CategorySelect({ name, value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded p-2"
    >
      <option value="">Select category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
