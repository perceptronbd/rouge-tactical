import { toast } from "sonner";
import { Button, FormInput, SelectInput } from "../../components";
import { useState } from "react";

// Mock data
const selectOpts = [
  { value: "id-1", name: "Admin 1" },
  { value: "id-2", name: "Admin 2" },
  { value: "id-3", name: "Admin 3" },
  { value: "id-4", name: "Admin 4" },
  { value: "id-5", name: "Admin 5" },
];

export default function Notification() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const handleNewItemRequest = (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      // TODO: API call
      toast.success("Updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading1(false);
    }
  };

  const handlePermitNotification = (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      // TODO: API call
      toast.success("Updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading2(false);
    }
  };

  const handleMachineNotification = (e) => {
    e.preventDefault();
    setLoading3(true);
    try {
      // TODO: API call
      toast.success("Updated successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading3(false);
    }
  };

  return (
    <div className="bg-foreground h-full w-full">
      <div className="mt-3 px-5 pt-5 flex gap-5 justify-between">
        <form onSubmit={handleNewItemRequest}>
          <fieldset className="border px-3 rounded-md">
            <legend className="text-[16px] font-medium text-textColor">
              New Item Request
            </legend>
            <SelectInput
              placeholder="Notify Admin"
              label="Notify Admin"
              defaultValue="Select Admin"
              required
              selectOpts={selectOpts}
            />
            <Button
              loading={loading1}
              className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8"
            >
              Save
            </Button>
          </fieldset>
        </form>
        <form onSubmit={handlePermitNotification}>
          <fieldset className="border px-3 rounded-md">
            <legend className="text-[16px] font-medium text-textColor">
              Permits Notification
            </legend>
            <SelectInput
              placeholder="Permit"
              label="Permit"
              required
              defaultValue="Select Permit"
              selectOpts={selectOpts}
            />
            <SelectInput
              placeholder="Notify Admin"
              label="Notify Admin"
              required
              defaultValue="Select Admin"
              selectOpts={selectOpts}
            />
            <FormInput
              label="Alert Prior Deadline (Days)"
              placeholder="Alert Prior Deadline (Days)"
              required
            />
            <Button
              loading={loading2}
              className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8"
            >
              Save
            </Button>
          </fieldset>
        </form>

        <form onSubmit={handleMachineNotification}>
          <fieldset className="border px-3 rounded-md">
            <legend className="text-[16px] font-medium text-textColor">
              Machines Notification
            </legend>
            <SelectInput
              placeholder="Machine"
              label="Machine"
              required
              defaultValue="Select Machine"
              selectOpts={selectOpts}
            />
            <SelectInput
              placeholder="Notify Admin"
              label="Notify Admin"
              required
              defaultValue="Select Admin"
              selectOpts={selectOpts}
            />
            <FormInput
              label="Alert Prior Deadline (Days)"
              placeholder="Alert Prior Deadline (Days)"
              required
            />
            <Button
              loading={loading3}
              
              className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8"
            >
              Save
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
