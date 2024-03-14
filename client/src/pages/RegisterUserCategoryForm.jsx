import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSubmitButton from "../components/FormSubmitButton";

const RegisterUserCategoryForm = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleSelection = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategories.includes(selectedCategory)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };
  //console.log("selected categories==>", selectedCategories);

  const handleSubmit = (e) => {
    e.preventDefault();
    let userRegisterData = JSON.parse(localStorage.getItem("userRegisterData"));

    userRegisterData = {
      ...userRegisterData,
      categories: selectedCategories,
    };
    localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData));
    navigate("/register");
    //console.log("Categories stored:", selectedCategories);
  };

  //The categories if necessary can be stored in another file
  //and imported here
  const categories = [
    "React",
    "MongoDB",
    "Docker",
    "CSS",
    "HTML",
    "Express.js",
    "Node.js",
    "Tailwind",
    "Firebase",
    "Redux",
  ];

  return (
    <>
      <div>
        <h2 className="text-2xl text-center mb-6">
          What are you interested in?
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-2 justify-center items-center mb-5">
            {categories.map((category, index) => (
              <label
                key={index}
                className={`flex items-center justify-center px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ${
                  selectedCategories.includes(category)
                    ? "bg-orange-500"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <input
                  className="sr-only"
                  type="checkbox"
                  value={category}
                  onChange={handleSelection}
                />
                {category}
              </label>
            ))}
          </div>
          <FormSubmitButton name="Next" />
        </form>
      </div>
    </>
  );
};

export default RegisterUserCategoryForm;
