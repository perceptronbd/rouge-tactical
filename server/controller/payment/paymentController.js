const Vendor = require("../../model/vendorModel");
const Service = require("../../model/serviceModel");
const User = require("../../model/userModel");

const createService = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    const { service, account, cost, due } = req.body;

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found" });
        }

        if (!service || !account || !cost || !due) {
            return res.status(400).json({
                error: "All required fields must be provided for creating Service"
            });
        }

        const newServiceData = {
            service: service,
            accountNumber: account,
            cost: cost,
            dueDate: due
        };

        const newService = new Service(newServiceData);

        await newService.save();
        res.json({
            code: 200,
            data: {
                userId: req.userId,
                newServiceData: newService // Return the newService instance
            }
        });
    } catch (error) {
        console.error("Error creating Service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllServicedata = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found!" });
        }

        const existingServices = await Service.find();

        if (!existingServices){
            return res.status(400).json({
                error:"No Service data found"
            })
        }

        const formattedService = existingServices.map((data) => ({
            ServiceId: data._id,
            service: data.name,
            accountNumber: data.account,
            cost: data.cost,
            dueDate: data.due
          }));

        res.json({
            code: 200,
            data: {
                userId: req.userId,
                services: formattedService
            }
        });
    } catch (error) {
        console.error("Error getting services:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}





const updateService = async(req,res) =>{

    const {
        serviceId,
        service,
        accountNumber,
        cost,
        due
      } = req.body;

      try {
        const existingServices = await Service.findOne({
            _id:serviceId,
        })

        if (!existingServices) {
            return res.status(404).json({error: "no service data found"})
        }

        if (service != null && service !== "" || accountNumber != null && service !== "" || cost != null && cost !== "" || due != null && due !== "") {
            existingServices.service = service;
            existingServices.accountNumber = accountNumber;
            existingServices.cost = cost;
            existingServices.dueDate = due;
          }

        const updatedServices = await existingServices.save()

        const formattedUpdateService = existingServices.map((data) => ({
            ServiceId: data._id,
            service: data.name,
            accountNumber: data.account,
            cost: data.cost,
            dueDate: data.due
          }));

          
    return res.status(200).json({
        code: 200,
        data: {
          userId: req.userId,
          updatedInvoiceData: formattedUpdateService,
        },
      });



      } catch (error) {

        console.error("Error updating service:", error);
        res.status(500).json({ error: "Internal server error" });
        
      }
    
}


module.exports = {
    createService,
    getAllServicedata,
    updateService
  };