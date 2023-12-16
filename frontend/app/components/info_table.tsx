import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type UserInfo = {
  UserID: number;
  Username: string;
  // Add more properties as needed
};

type InfoProps = {
  data: UserInfo[];
};

function InfoTable({ data }: InfoProps) {
  const router = useRouter();

  const handleEditClick = (userId: number) => {
    // Navigate to the [id] folder
    router.push(`/admin_accounts/${userId}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">User ID</th>
            <th className="py-2 px-4 border-b text-center">User Name</th>
            <th className="py-2 px-4 border-b text-center">Modify</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 px-4 border-b text-center">{item.UserID}</td>
              <td className="py-2 px-4 border-b text-center">
                {item.Username}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-buttonpink text-parrot-pink py-1 px-2 rounded"
                  onClick={() => handleEditClick(item.UserID)}
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;
