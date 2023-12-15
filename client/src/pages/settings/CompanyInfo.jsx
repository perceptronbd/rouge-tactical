import { useState } from "react";
import { Button, FormInput } from "../../components";
import { toast } from "sonner";

export default function CompanyInfo() {
  const [loginFile, setLoginFile] = useState();
  const [sidebarOpenFile, setSidebarOpenFile] = useState();
  const [sidebarCloseFile, setSidebarCloseFile] = useState();

  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success("Updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-foreground">
      <form onSubmit={onSubmit} className="mt-5 pl-3 space-y-3">
        <div className="p-1 flex gap-3 items-end">
          <div className="border-2 rounded-[calc(0.375rem+0.25rem)] p-1 relative">
            <p className="text-[12px] leading-none absolute -top-2 left-2 px-1 bg-foreground">
              Login Image
            </p>
            <img
              src={loginFile || "/assets/logo.svg"}
              alt="Login logo"
              className="rounded-md w-52 h-28 object-cover"
            />
          </div>
          <div>
            <input
              type="file"
              name="loginFile"
              accept="image/*"
              className="text-xs"
              onChange={(e) =>
                setLoginFile(
                  e.target.files[0] && URL.createObjectURL(e.target.files[0])
                )
              }
            />
          </div>
        </div>
        <div className="p-1 flex gap-3 items-end">
          <div className="border-2 rounded-[calc(0.375rem+0.25rem)] p-1 relative">
            <p className="text-[12px] leading-none absolute -top-2 left-2 px-1 bg-foreground">
              Sidebar Image (open)
            </p>
            <img
              src={sidebarOpenFile || "/assets/logo.svg"}
              alt="Sidebar logo open"
              className="rounded-md w-52 h-28 object-cover"
            />
          </div>
          <div>
            <input
              type="file"
              name="sidebarOpen"
              accept="image/*"
              className="text-xs"
              onChange={(e) =>
                setSidebarOpenFile(
                  e.target.files[0] && URL.createObjectURL(e.target.files[0])
                )
              }
            />
          </div>
        </div>
        <div className="p-1 flex gap-3 items-end">
          <div className="border-2 rounded-[calc(0.375rem+0.25rem)] p-1 relative">
            <p className="text-[12px] leading-none absolute -top-2 bg-foreground">
              Sidebar Image (closed)
            </p>
            <img
              src={sidebarCloseFile || "/assets/logo-sm.svg"}
              alt="Sidebar logo close"
              className="rounded-md w-[120px] h-[120px] object-cover"
            />
          </div>
          <div>
            <input
              type="file"
              name="sidebarClose"
              accept="image/*"
              className="text-xs"
              onChange={(e) =>
                setSidebarCloseFile(
                  e.target.files[0] && URL.createObjectURL(e.target.files[0])
                )
              }
            />
          </div>
        </div>
        <div>
          <FormInput
            label="Address"
            placeholder="Address"
            name="address"
            loading={loading}
            onChange={(e) => e.target.value}
            className={"my-3"}
          />
        </div>
        <Button>Update</Button>
      </form>
    </div>
  );
}
