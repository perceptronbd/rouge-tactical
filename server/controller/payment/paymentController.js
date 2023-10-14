const Vendor = require("../../model/vendorModel");
const Service = require("../../model/serviceModel");
const User = require("../../model/userModel");

const createService = async(req,res) => {
    console.log(req.userId)
    console.log(req.email)

    const {service,account,cost,due} = req.body

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        })
    
    if (!existingUser) {
        return res.status(404).json({ error: "No User found" });
      }
    
    if (!service || !account || !cost || !due){
        return res.status(400).json({
            error: "All required fields must be provided for creating Service",
    }
}

    const newServiceData = {
        service:service,
        accountNumber: account,
        cost:cost,
        dueDate:due

    }
    await newServiceData.save();
    res.json({
        code: 200,
        data: {
          userId: req.userId,
          newVendorData: newServiceData,
        },
      });
    } catch (error) {
      console.error("Error creating Service:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  

}




