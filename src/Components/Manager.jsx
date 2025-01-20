import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  });

  const notify = () => toast("Password copied to clipboard");
  const deletion = () => toast("Password deleted successfully");
  const saved = () => toast("Password saved successfully");

  const copyText = (text) => {
    // alert("Password copied to clipboard");
    navigator.clipboard.writeText(text);
    notify();
  };

  const toggle = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      ref.current.type = "password";
    } else {
      ref.current.type = "text";
    }
  };

  const savePassword = () => {
    if(form.site.length===0 || form.username.length===0 || form.password.length===0){
        toast("Please fill all the fields");
    }
    else{
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setForm({ site: "", username: "", password: "" });
    saved();
}
    };

  const deletePsswd = (id) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmDelete) {
        const updatedArray = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray)); // U
     // setPasswordArray(passwordArray.filter((item) => item.id !== id));
      deletion();
    }
    
  };

  const editPsswd = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("Edit your password and click on Add Password");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />

      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="btn flex justify-center mt-12 text-purple-500 text-3xl font-bold">
        #<span className="text-gray-950">Pass</span>PRO
      </div>
      <div className="flex justify-center text-gray-950 mb-4">
        Your own Password Manager
      </div>
      <div className="container mx-auto">
        <div className="text-white flex flex-col gap-3 p-4">
          <input
            value={form.site}
            onChange={handleChange}
            className="border rounded-xl px-2 py-1 border-gray-950 text-black"
            type="text"
            name="site"
            placeholder="Enter website URL"
          />
          <div className="flex ">
            <input
              value={form.username}
              onChange={handleChange}
              className="border w-2/3 rounded-xl  mr-12  px-2 py-1 border-gray-950 text-black"
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <input
              ref={ref}
              value={form.password}
              onChange={handleChange}
              className="border  w-1/3 rounded-xl px-2 py-1 border-gray-950 text-black"
              type="text"
              name="password"
              placeholder="Enter Password"
            />
            <span
              class="material-symbols-outlined mx-2 cursor-pointer text-black my-1"
              onClick={toggle}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <lord-icon
          src="https://cdn.lordicon.com/sbnjyzil.json"
          trigger="hover"
        ></lord-icon>
        <button
          onClick={savePassword}
          className=" bg-purple-500 px-4 py-2  text-black rounded-3xl border border-black w-fit"
        >
          Save
        </button>
      </div>
      <div className="passwords  my-4 md:my-10 md:mx-20">
        <h2 className="text-xl font-bold mb-5">Your passwords</h2>
        {passwordArray.length === 0 && <div>No passwords to show </div>}
        {passwordArray.length != 0 && (
          <table class="table-auto w-full rounded-md overflow-hidden ">
            <thead className="text-white bg-purple-900  ">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-black bg-purple-200">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center py-2">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                    </td>
                    <td className="text-center py-2">{item.username}</td>
                    <td className="text-center  py-2">
                      {item.password}

                      <span
                        class="material-symbols-outlined cursor-pointer"
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        content_copy
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        onClick={() => {
                          editPsswd(item.id);
                        }}
                      >
                        edit
                      </span>
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        onClick={() => {
                          deletePsswd(item.id);
                        }}
                      >
                        delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
