import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { removeCompany } from "../../redux/companySlice"; // ✅ Fixed Import
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!companies) return;

    const filteredCompany = companies.filter(
      (company) =>
        !searchCompanyByText ||
        company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  const handleDelete = async (companyId) => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(removeCompany(companyId));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete company.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={company.logo || "/default-logo.png"}
                    alt={`${company.name} logo`}
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {company.createdAt
                  ? new Date(company.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2">
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => handleDelete(company._id)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-red-600 mt-2"
                    >
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
