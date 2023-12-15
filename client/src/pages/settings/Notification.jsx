import { Button, FormInput, SelectInput } from "../../components";

// Mock data
const selectOpts = [
  { value: "id-1", name: "Admin 1" },
  { value: "id-2", name: "Admin 2" },
  { value: "id-3", name: "Admin 3" },
  { value: "id-4", name: "Admin 4" },
  { value: "id-5", name: "Admin 5" },
];

export default function Notification() {
  const handleNewItemRequest = () => {};

  const handlePermitNotification = () => {};

  const handleMachineNotification = () => {};

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
              selectOpts={selectOpts}
            />
            <Button className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8">
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
              defaultValue="Select Permit"
              selectOpts={selectOpts}
            />
            <SelectInput
              placeholder="Notify Admin"
              label="Notify Admin"
              defaultValue="Select Admin"
              selectOpts={selectOpts}
            />
            <FormInput
              label="Alert Prior Deadline (Days)"
              placeholder="Alert Prior Deadline (Days)"
            />
            <Button className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8">
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
              defaultValue="Select Machine"
              selectOpts={selectOpts}
            />
            <SelectInput
              placeholder="Notify Admin"
              label="Notify Admin"
              defaultValue="Select Admin"
              selectOpts={selectOpts}
            />
            <FormInput
              label="Alert Prior Deadline (Days)"
              placeholder="Alert Prior Deadline (Days)"
            />
            <Button className="mt-3 float-right bg-black text-accent-primary w-[150px] h-8">
              Save
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
