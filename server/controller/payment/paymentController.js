const Vendor = require("../../model/vendorModel");
const Service = require("../../model/serviceModel");
const User = require("../../model/userModel");

const createService = async (req, res) => {
    console.log(req.userId);
    console.log(req.email);

    const { service, accountNumber, cost, dueDate } = req.body;

    try {
        const existingUser = await User.findOne({
            _id: req.userId
        });

        if (!existingUser) {
            return res.status(404).json({ error: "No User found" });
        }

        if (!service || !accountNumber || !cost || !dueDate) {
            return res.status(400).json({
                error: "All required fields must be provided for creating Service"
            });
        }

        const newServiceData = {
            service: service,
            accountNumber: accountNumber,
            cost: cost,
            dueDate: dueDate
        };

        const newService = new Service(newServiceData);

        await newService.save();

        const formattedService = newService.map((data) => ({
            ServiceId: data._id,
            service: data.name,
            accountNumber: data.accountNumber,
            cost: data.cost,
            dueDate: data.dueDate
          }));


        res.json({
            code: 200,
            data: {
                userId: req.userId,
                newServiceData: formattedService // Return the newService instance
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
            accountNumber: data.accountNumber,
            cost: data.cost,
            dueDate: data.dueDate
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
        dueDate
      } = req.body;

      try {
        const existingServices = await Service.findOne({
            _id:serviceId,
        })

        if (!existingServices) {
            return res.status(404).json({error: "no service data found"})
        }

        if (service != null && service !== "" || accountNumber != null && accountNumber !== "" || cost != null && cost !== "" || dueDate != null && dueDate !== "") {
            existingServices.service = service;
            existingServices.accountNumber = accountNumber;
            existingServices.cost = cost;
            existingServices.dueDate = dueDate;
          }

        const updatedServices = await existingServices.save()

        const formattedUpdateService = existingServices.map((data) => ({
            ServiceId: data._id,
            service: data.name,
            accountNumber: data.accountNumber,
            cost: data.cost,
            dueDate: data.dueDate
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


const fetchServiceCost = async (req, res) => {
    try {
        // Fetch data for services
        const allServices = await Service.find();

        // Get the time interval from req.body
        const { timeInterval } = req.body;

        // Declare required variables.
        const now = new Date();
        const totalCost = {};

        // Define the end date based on the provided time interval
        let intervalEndDate = new Date();

        if (timeInterval === '1 week') {
            intervalEndDate.setDate(now.getDate() - 7);
        } else if (timeInterval === '2 weeks') {
            intervalEndDate.setDate(now.getDate() - 14);
        } else if (timeInterval === '1 month') {
            intervalEndDate.setMonth(now.getMonth() - 1);
        } else if (timeInterval === '3 months') {
            intervalEndDate.setMonth(now.getMonth() - 3);
        } else if (timeInterval === '6 months') {
            intervalEndDate.setMonth(now.getMonth() - 6);
        } else if (timeInterval === '1 year') {
            intervalEndDate.setFullYear(now.getFullYear() - 1);
        }

        // Filter services that fall within the time interval
        const filteredServices = allServices.filter(service => service.dueDate >= intervalEndDate && service.dueDate <= now);

        // Calculate the total cost of filtered services
        const totalCostValue = filteredServices.reduce((acc, service) => acc + service.cost, 0);

        // Store the total cost in the result object
        totalCost[timeInterval] = totalCostValue;

        res.status(200).json({
            code: 200,
            data: [{filteredServices:totalCost}],
        });
    } catch (error) {
        console.error("Error fetching and calculating service data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    createService,
    getAllServicedata,
    updateService,
    fetchServiceCost
  };