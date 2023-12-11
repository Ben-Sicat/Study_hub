import Link from "next/link";
import React from "react";

type UserInfo = {
  id: number;
  name: string;
  // Add more properties as needed
};

type InfoProps = {
  data: UserInfo[];
};

function InfoTable({ data }: InfoProps) {
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
              <td className="py-2 px-4 border-b text-center">{item.id}</td>
              <td className="py-2 px-4 border-b text-center">{item.name}</td>
              <td className="py-2 px-4 border-b text-center">
                <Link href="/edit_profile">
                  <button className="bg-buttonpink text-parrot-pink py-1 px-2 rounded">
                    Modify
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;
