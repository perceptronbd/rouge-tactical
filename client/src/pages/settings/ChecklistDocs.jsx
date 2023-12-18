import { useState } from "react";
import { Button, DocInput } from "../../components";
import { checklistDocs } from "../../mock/checklistDocs";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

export default function ChecklistDocs() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success("Uploaded successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    try {
      toast.success("Deleted successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="h-full w-full pt-5">
      <div className="flex gap-10">
        <form onSubmit={handleSubmit}>
          <div className="border-2 rounded-[calc(0.375rem+0.25rem)] px-2 relative">
            <p className="text-[14px] leading-none absolute -top-2 left-2 px-1 bg-foreground font-semibold">
              Upload Doc
            </p>
            <DocInput
              file={file}
              label={"Upload Document"}
              id={"document"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <Button
            loading={loading}
            className="mt-3 w-full bg-black text-accent-primary"
          >
            Upload
          </Button>
        </form>
        <div className="border-2 rounded-lg flex-1 p-1">
          <table className="w-full">
            <tr className="text-[16px] text-left">
              <th>Files</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th></th>
            </tr>
            {checklistDocs.map((doc) => (
              <tr className="bg-gray-100 border border-white text-[14px] hover:bg-gray-200">
                <td className="rounded-l-md pl-3">{doc.filename}</td>
                <td>{doc.uploadedBy}</td>
                <td>{doc.date}</td>
                <td className="rounded-r-md">
                  <button onClick={handleDelete}>
                    <FaTrash className="text-gray-500 hover:text-red-500 transition-all hover:scale-110" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
